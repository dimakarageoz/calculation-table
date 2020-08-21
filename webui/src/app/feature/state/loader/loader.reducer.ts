import { Action, createReducer, on } from '@ngrx/store';
import { loadingChanged } from './loader.actions';
import { INewLoaderState } from './loader.models';
import { LOADER_INIT_STATE } from '../state.constants';

const actionReducer = createReducer(
    LOADER_INIT_STATE,
    on(loadingChanged, (currentState: boolean, { state }: INewLoaderState) => state)
);

export function loaderReducer(state: boolean | undefined, action: Action): boolean {
    return actionReducer(state, action);
}
