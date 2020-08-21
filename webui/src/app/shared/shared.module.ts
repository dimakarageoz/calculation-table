import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from './modules/table/table.module';
import { ButtonModule } from './modules/button/button.module';
import { LoaderModule } from './modules/loader/loader.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        LoaderModule
    ],
    exports: [
        TableModule,
        ButtonModule,
        LoaderModule
    ]
})
export class SharedModule {

}
