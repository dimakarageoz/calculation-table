import { createAction, props } from '@ngrx/store';
import { INewLoaderState } from './loader.models';

export const loadingChanged = createAction('[Feature Module] Loading state changed', props<INewLoaderState>());
