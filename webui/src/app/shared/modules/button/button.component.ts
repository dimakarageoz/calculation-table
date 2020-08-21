import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

    @Input()
    public readonly primary!: boolean;

    @Input()
    public readonly type!: string;

    @Input()
    public readonly disabled!: boolean;
}
