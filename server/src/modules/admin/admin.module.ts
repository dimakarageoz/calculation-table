import { Module } from '@nestjs/common';
import { AdminCellModule } from './cell/admin-cell.module';

@Module({
    imports: [
        AdminCellModule,
    ]
})
export class AdminModule {
}
