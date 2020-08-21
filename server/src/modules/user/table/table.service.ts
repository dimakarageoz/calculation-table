import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Row } from '../../../db/schemas/row.schema';
import { CellBody, IMongooseExec } from './table.models';

@Injectable()
export class TableService {

    constructor(
        @InjectModel(Row.name)
        private readonly rowModel: Model<Row>
    ) { }

    public getTableRows(): Promise<Array<Row>> {
        return this.rowModel.find({}, { __v: 0}).exec();
    }

    public getTableSum(): Promise<Array<number>> {
        return this.calculateRowColumns(
            0, (sum: number, item: number) => sum + item
        );
    }

    public getTableMultiply(): Promise<Array<number>> {
        return this.calculateRowColumns(
            1, (multiply: number, item: number) => multiply * item
        );
    }

    public async addRow(): Promise<void> {
        const row = await this.rowModel.findOne({});
        const cellCount = row ? row.cells.length : 1;

        await this.rowModel.create({
            cells: Array(cellCount).fill(0)
        });
    }

    public addCells(): Promise<void> {
        return this.rowModel.updateMany({}, {
                $push: {
                    cells: 0
                }
            })
            .exec()
        ;
    }

    public updateCell({ row: _id, cell, value }: CellBody): Promise<Row | null> {
        return this.rowModel.findOneAndUpdate({
                $and: [
                    { _id },
                    {
                        [`cells.${cell}`]: {
                            $exists: true
                        }
                    }
                ]
            },
            {
                $set: {
                    [`cells.${cell}`]: value
                }
            }
        ).exec();
    }

    public removeRow(id: string): Promise<Row | null> {
        return this.rowModel.findByIdAndRemove(id).exec();
    }

    public removeCell(index: number): Promise<IMongooseExec> {
        return this.rowModel.updateMany({}, [{
            $set: {
                cells: {
                    $concatArrays: [
                        {
                            $slice: ["$cells", index]
                        },
                        {
                            $slice: [
                                "$cells",
                                { $add: [1, index] },
                                { $size: "$cells" }
                            ]
                        }
                    ]
                }
            }
        }]).exec();
    }

    public removeEmptyRows(): Promise<void> {
        return this.rowModel.deleteMany({
            'cells.0': { $exists: false }
        })
            .exec()
            .then()
        ;
    }

    private async calculateRowColumns(
        defaultValue: number,
        cb: (resultValue: number, nextItem: number) => number
    ): Promise<Array<number>> {
        const rows = await this.rowModel.find({}, { cells: 1, _id: 0 }).exec();

        if (!rows || !rows.length) {
            return [];
        }

        const rowLength = rows[0].cells.length;
        const rowCount = rows.length;
        const calculation: Array<number> = [];

        for (let cellIndex = 0; cellIndex < rowLength; cellIndex++) {
            let sum = defaultValue;

            for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                sum = cb(sum, rows[rowIndex].cells[cellIndex]);
            }

            calculation.push(sum);
        }

        return calculation;
    }
}
