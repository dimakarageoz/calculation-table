import {
    ChangeDetectionStrategy,
    Component,
    Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IRow } from '../../models/api.models';
import { modifyTable } from '../../state/table/table.actions';

@Component({
    selector: 'app-calculation-cell',
    templateUrl: './calculation-cell.component.html',
    styleUrls: ['./calculation-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationCellComponent {

    @Input()
    public readonly value: number | null;

    @Input()
    public readonly row: string;

    @Input()
    public readonly cell: number;

    constructor(
        private store: Store<{ table: Array<IRow>, loader: boolean, errors: string }>
    ) { }

    public valueChange(inputValue: string): void {
        const value = parseFloat(inputValue) || 0;

        this.store.dispatch(
            modifyTable({
                action: 'updateCell',
                data: {
                    row: this.row,
                    cell: this.cell,
                    value
                }
            })
        );
    }
}
