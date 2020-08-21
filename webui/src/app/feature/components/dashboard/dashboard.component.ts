import { Component, OnInit } from '@angular/core';
import { skip, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { ApiService } from '../../services/api.service';
import { DestroyComponent } from '../../../shared/base/destroy.component';
import { IRow } from '../../models/api.models';
import { TCellData } from '../../models/common.models';
import { loadTableData } from '../../state/table/table.actions';
import { IErrorState } from '../../state/errors/errors.models';
import { ICalculatedRowStore } from '../../state/calculated-data/calculated-data.models';
import { tableCalculation } from '../../state/calculated-data/calculated-data.actions';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends DestroyComponent implements OnInit {

    public rows: Array<IRow> = [];

    public tableData: Array<Array<TCellData>> = [];

    public loader: boolean = false;

    constructor(
        private apiService: ApiService,
        private store: Store<{
            table: Array<IRow>,
            loader: boolean,
            calculatedRow: ICalculatedRowStore,
            errors: IErrorState
        }>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.store.pipe(select('table'))
            .pipe(
                skip(1),
                takeUntil(this.destroy$)
            )
            .subscribe((rows: Array<IRow>) => {
                if (!rows) {
                    return;
                }

                this.rows = rows;
                this.store.dispatch(tableCalculation({ state: null }));

                this.generateTableData();
            })
        ;

        this.store.pipe(select('loader'))
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((loader: boolean) => this.loader = loader)
        ;

        this.store.pipe(select('errors'))
            .pipe(
                skip(1),
                takeUntil(this.destroy$)
            )
            .subscribe(({ message }: IErrorState) => this.showErrorMessage(message))
        ;

        this.store.pipe(select('calculatedRow'))
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((data: ICalculatedRowStore) => this.calculateTable(data))
        ;

        this.store.dispatch(loadTableData());
    }

    public calculateTable({ rows, type }: ICalculatedRowStore): void {
        if (!type) {
            this.removeCalculationRow();

            return;
        }

        const newRow = rows
            .map((value: number): TCellData => ({ calculated: value }))
            .concat({})
        ;

        if (this.rows.length === this.tableData.length - 1) {
            this.tableData = [...this.tableData, newRow];
        } else {
            this.tableData[this.tableData.length - 1] = newRow;
        }

        this.tableData = [...this.tableData];
    }

    public removeCalculationRow(): void {
        if (this.rows.length !== this.tableData.length - 1) {
            this.tableData = this.tableData.slice(0, -1);
        }
    }

    public isNumber(value: number | undefined): boolean {
        return typeof value === 'number';
    }

    private generateTableData(): void {
        const dropCell = {
            drop: true
        };

        this.tableData = this.rows.map((item: IRow) => {
            return [...item.cells.map((value: number) => ({ value })), dropCell];
        });

        if (!this.tableData.length) {
            return;
        }

        this.tableData.unshift(
            Array(this.tableData[0].length - 1).fill(dropCell).concat({})
        );
    }

    private showErrorMessage(error: string): void {
        alert(error);
    }
}
