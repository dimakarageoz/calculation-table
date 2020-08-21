import { createAction, props } from '@ngrx/store';
import { IErrorState } from './errors.models';

export const ariseError = createAction('[Feature Module] Arise Error', props<IErrorState>());
