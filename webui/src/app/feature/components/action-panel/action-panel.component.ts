import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { modifyTable } from '../../state/table/table.actions';
import { tableCalculation } from '../../state/calculated-data/calculated-data.actions';
import { DestroyComponent } from '../../../shared/base/destroy.component';
import { ICalculatedRowStore, TCalculationType } from '../../state/calculated-data/calculated-data.models';

@Component({
    selector: 'app-action-panel',
    templateUrl: './action-panel.component.html',
    styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent extends DestroyComponent implements OnInit {

    @Input()
    public onlyRowCreate: boolean = false;

    public type: TCalculationType;

    constructor(
        private store: Store<{ calculatedRow: ICalculatedRowStore }>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.store.pipe(select('calculatedRow'))
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(({ type }: ICalculatedRowStore) => this.type = type)
        ;
    }

    public createRow(): void {
        this.store.dispatch(modifyTable({ action: 'createRow' }));
    }

    public addColumn(): void {
        this.store.dispatch(modifyTable({ action: 'createColumn' }));
    }

    public calculate(type?: TCalculationType): void {
        const state = type || null;

        this.store.dispatch(tableCalculation({ state }));
    }
}
