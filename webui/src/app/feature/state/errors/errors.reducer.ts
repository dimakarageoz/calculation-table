import { Action, createReducer, on } from '@ngrx/store';
import { ariseError } from './errors.actions';
import { IErrorState } from './errors.models';
import { ERROR_INIT_STATE } from '../state.constants';

const actionReducer = createReducer(
    ERROR_INIT_STATE,
    on(ariseError, (currentState: IErrorState, { message }: IErrorState) => ({ message }))
);

export function errorReducer(state: IErrorState | undefined, action: Action): IErrorState {
    return actionReducer(state, action);
}
