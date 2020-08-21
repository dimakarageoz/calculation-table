import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ariseError } from './errors/errors.actions';

@Injectable()
export class EffectsBase {

    protected ariseError({ error, message: httpMessage }: HttpErrorResponse): Observable<Action> {
        const message = error && error.message
            ? error.message
            : httpMessage;

        return of(ariseError({ message }));
    }
}
