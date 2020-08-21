import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { newCalculatedData, tableCalculation } from './calculated-data.actions';
import { TCalculationType } from './calculated-data.models';
import { ApiService } from '../../services/api.service';
import { EffectsBase } from '../effects.base';
import { CreateEffectMetadata } from '@ngrx/effects/src/models';

@Injectable()
export class CalculatedDataEffects extends EffectsBase {

    public loadDataCalculation$: CreateEffectMetadata = createEffect(() => this.actions$.pipe(
        ofType(tableCalculation),
        switchMap(({ state }: { state: TCalculationType }) =>
            this.calculateRequest(state)
                .pipe(
                    map((row: Array<number>) => newCalculatedData({ rows: row })),
                    catchError((error: HttpErrorResponse) => this.ariseError(error))
                )
        )
    ));

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {
        super();
    }

    private calculateRequest(state: TCalculationType): Observable<Array<number>> {
        const requests$: {
            [key in Exclude<TCalculationType, null>]: Observable<Array<number>>
        } = {
            sum: this.apiService.getTableSum(),
            multiply: this.apiService.getTableMultiply()
        };

        return state ? requests$[state] : of([]);
    }
}
