import { Controller, UseGuards, Delete, HttpStatus } from '@nestjs/common';

import { RolesGuard } from '../admin.guard';
import { AdminCellService } from './admin-cell.service';
import { createException } from '../../../utils/errors';

@Controller('admin/table')
@UseGuards(RolesGuard)
export class AdminCellController {

    constructor(
        private adminCellService: AdminCellService
    ) { }

    @Delete('drop')
    public dropCellCollection(): Promise<boolean> {
        return this.adminCellService.dropCellCollection()
            .catch((err) => {
                throw createException(HttpStatus.INTERNAL_SERVER_ERROR, err.message)
            })
        ;
    }
}
