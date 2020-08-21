import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges {

    @Input()
    public readonly rows!: Array<Array<any>>;

    @Input()
    public readonly cellTemplate!: TemplateRef<HTMLElement>;

    public maxRowMock: Array<boolean> = [];

    public ngOnChanges(changes: SimpleChanges): void {
        const { rows } = changes;

        if (rows && this.rows && this.rows.length) {
            const length = this.rows[0].length;

            this.maxRowMock = length
                ? Array(length).fill(null)
                : []
            ;
        }
    }
}
