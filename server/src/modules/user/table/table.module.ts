import { Module } from '@nestjs/common';

import { TableService } from './table.service';
import { SchemasModule } from '../../../db/schemasModule';
import { TableController } from './table.controller';

@Module({
    controllers: [TableController],
    imports: [SchemasModule],
    providers: [TableService]
})
export class TableModule { }
