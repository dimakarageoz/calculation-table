import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { ROW_MODEL_NAME } from '../../../db/schemas/row.schema';

@Injectable()
export class AdminCellService {

    constructor(
        @InjectConnection()
        private connection: Connection
    ) { }

    public dropCellCollection(): Promise<boolean> {
        return this.connection.db.dropCollection(ROW_MODEL_NAME);
    }
}
