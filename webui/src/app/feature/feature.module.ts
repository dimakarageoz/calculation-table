import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculationCellComponent } from './components/calculation-cell/calculation-cell.component';
import { ApiService } from './services/api.service';
import { RemoveCellComponent } from './components/remove-cell/remove-cell.component';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { TableEffects } from './state/table/table.effects';
import { LoaderEffects } from './state/loader/loader.effects';
import { tableReducer } from './state/table/table.reducer';
import { loaderReducer } from './state/loader/loader.reducer';
import { errorReducer } from './state/errors/errors.reducer';
import { calculatedRowReducer } from './state/calculated-data/calculated-data.reducer';
import { CalculatedDataEffects } from './state/calculated-data/calculated-data.effects';

@NgModule({
    declarations: [
        DashboardComponent,
        CalculationCellComponent,
        ActionPanelComponent,
        RemoveCellComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        StoreModule.forRoot({
            table: tableReducer,
            loader: loaderReducer,
            errors: errorReducer,
            calculatedRow: calculatedRowReducer
        }),
        EffectsModule.forRoot([TableEffects, LoaderEffects, CalculatedDataEffects])
    ],
    providers: [
        ApiService
    ],
    exports: [
        DashboardComponent
    ]
})
export class FeatureModule {

}
