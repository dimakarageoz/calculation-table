import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { loadingChanged } from './loader.actions';
import { ariseError } from '../errors/errors.actions';
import { loadTableData, newTableDataCome } from '../table/table.actions';
import { newCalculatedData, tableCalculation } from '../calculated-data/calculated-data.actions';
import { CreateEffectMetadata } from '@ngrx/effects/src/models';

@Injectable()
export class LoaderEffects {

    public loadingStart$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(loadTableData, tableCalculation),
        map(() => loadingChanged({ state: true }))
    ));

    public loadingEnd$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(newTableDataCome, ariseError, newCalculatedData),
        map(() => loadingChanged({ state: false }))
    ));

    constructor(
        private actions$: Actions
    ) {}
}
