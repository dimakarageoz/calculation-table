import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { modifyTable } from '../../state/table/table.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-remove-cell',
    templateUrl: './remove-cell.component.html',
    styleUrls: ['./remove-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveCellComponent {

    @Input()
    public readonly row!: string | undefined;

    @Input()
    public readonly cell!: number | undefined;

    constructor(
        private store: Store
    ) { }

    public remove(): void {
        if (typeof this.cell === 'number') {
            this.store.dispatch(modifyTable({ action: 'removeColumn', data: this.cell }));
        }

        if (typeof this.row === 'string') {
            this.store.dispatch(modifyTable({ action: 'removeRow', data: this.row }));
        }
    }
}
