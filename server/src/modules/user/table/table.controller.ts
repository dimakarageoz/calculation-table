import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { TableService } from './table.service';
import { Row } from '../../../db/schemas/row.schema';
import { CellBody, IMongooseExec } from './table.models';
import { createException } from '../../../utils/errors';

@Controller('table')
export class TableController {

    constructor(
        private readonly tableService: TableService
    ) {}

    @Get()
    public async getRows(): Promise<{ rows: Array<Row> }> {
        const rows = await this.tableService.getTableRows()

        return { rows };
    }

    @Get('sum')
    public getTableSum(): Promise<Array<number>> {
        return this.tableService.getTableSum()
    }

    @Get('multiply')
    public getRowsMultiply(): Promise<Array<number>> {
        return this.tableService.getTableMultiply();
    }

    @Post('row')
    public createRow(): Promise<void> {
        return this.tableService.addRow();
    }

    @Post('column')
    public createColumn(): Promise<void> {
        return this.tableService.addCells();
    }

    @Patch('cell')
    public updateCell(
        @Body() body: CellBody
    ): Promise<void> {
        return this.tableService.updateCell(body)
            .then((updated: | Row | null) => {
                if (updated) {
                    return;
                }

                throw createException(HttpStatus.BAD_REQUEST, `Current cell doesn't exist`);
            })
        ;
    }

    @Delete('column/:index')
    public removeColumn(
        @Param('index') index: string
    ): Promise<void> {
        const cellIndex = parseFloat(index);

        if (isNaN(cellIndex)) {
            throw createException(HttpStatus.BAD_REQUEST, `Cell index is invalid`);
        }

        return this.tableService.removeCell(cellIndex)
            .then((cells: IMongooseExec) => {
                if (!cells || !cells.nModified) {
                    throw createException(HttpStatus.BAD_REQUEST, `Current cell index is invalid`);
                }

                return this.tableService.removeEmptyRows();
            })
        ;
    }

    @Delete('row/:id')
    public deleteRow(
        @Param('id') id: string
    ): Promise<void> {
        return this.tableService.removeRow(id)
            .then((removed: Row | null) => {
                if (removed) {
                    return;
                }

                throw createException(HttpStatus.BAD_REQUEST, `Current row doesn't exist`);
            })
        ;
    }
}
