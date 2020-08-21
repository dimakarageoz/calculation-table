import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class DestroyComponent implements OnDestroy {

    protected destroy$: Subject<void> = new Subject<void>();

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
