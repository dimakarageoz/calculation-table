import { Module } from '@nestjs/common';

import { AdminCellController } from './admin-cell.controller';
import { AdminCellService } from './admin-cell.service';

@Module({
    controllers: [AdminCellController],
    providers: [AdminCellService]
})
export class AdminCellModule {

}
