import { Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';

import { environment } from '../environment';
import { Row } from './schemas/row.schema';
import { Model } from "mongoose";
import { SchemasModule } from './schemasModule';

@Module({
    imports: [
        MongooseModule.forRoot(environment.DB_URL, {
            useNewUrlParser: true,
            useFindAndModify: false
        }),
        SchemasModule
    ],
    exports: [MongooseModule]
})
export class ConnectionModule {

    constructor(
        @InjectModel(Row.name)
        private readonly rowModel: Model<Row>
    ) {
        this.rowModel.find({})
            .exec()
            .then((rows: Array<Row>) => {
                if (rows && rows.length) {
                    return;
                }


                return Promise.all([
                    this.rowModel.create({ cells: [1, 5, 9, 10] }),
                    this.rowModel.create({ cells: [3, 9, 7, 2] })
                ])
            })
            .catch(() => {
                throw new Error('Error with mongodb initial script');
            })
        ;
    }

}
