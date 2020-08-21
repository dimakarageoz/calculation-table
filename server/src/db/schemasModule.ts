import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Row, RowSchema } from './schemas/row.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Row.name,
                schema: RowSchema
            }
        ])
    ],
    exports: [
        MongooseModule
    ]
})
export class SchemasModule {

}
