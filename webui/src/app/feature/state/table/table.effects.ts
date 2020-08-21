import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
    loadTableData,
    newTableDataCome,
    modifyTable
} from './table.actions';
import { ApiService } from '../../services/api.service';
import { IRowList } from '../../models/api.models';
import { IModifyData, TActions } from './table.models';
import { EffectsBase } from '../effects.base';
import { CreateEffectMetadata } from '@ngrx/effects/src/models';

@Injectable()
export class TableEffects extends EffectsBase {

    public loadRows$: CreateEffectMetadata = createEffect(
        () => this.actions$.pipe(
            ofType(loadTableData),
            switchMap(() => (
                this.apiService.getTableData()
                    .pipe(
                        map((data: IRowList) => newTableDataCome({ data })),
                        catchError((error: HttpErrorResponse) => this.ariseError(error))
                    )
            ))
        )
    );

    public modifyTable$: CreateEffectMetadata = createEffect(
        () => this.actions$.pipe(
            ofType(modifyTable),
            switchMap(({ action, data }: IModifyData) => (
                this.makeUpdateRequest(action, data)
                    .pipe(
                        map(() => loadTableData()),
                        catchError((error: HttpErrorResponse) => this.ariseError(error))
                    )
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {
        super();
    }

    private makeUpdateRequest(action: TActions, data: any): Observable<void> {
        const requests: {[key in TActions]: Observable<void>} = {
            createRow: this.apiService.createTableRow(),
            createColumn: this.apiService.createTableColumn(),
            removeColumn: this.apiService.removeTableColumn(data),
            removeRow: this.apiService.removeTableRow(data),
            updateCell: this.apiService.updateTableCell(data)
        };

        return requests[action];
    }
}
