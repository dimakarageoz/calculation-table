import { Action, createReducer, on } from '@ngrx/store';
import { ICalculatedRowStore, INewCalculationType, INewRowData } from './calculated-data.models';
import { newCalculatedData, tableCalculation } from './calculated-data.actions';
import { CALCULATED_DATA_INIT_STATE } from '../state.constants';

const actionReducer = createReducer(
    CALCULATED_DATA_INIT_STATE,
    on(tableCalculation, (initState: ICalculatedRowStore, { state }: INewCalculationType) => ({
        ...initState,
        type: state
    })),
    on(newCalculatedData, (initState: ICalculatedRowStore, { rows }: INewRowData) => ({
        ...initState,
        rows
    }))
);

export function calculatedRowReducer(state: ICalculatedRowStore | undefined, action: Action): ICalculatedRowStore {
    return actionReducer(state, action);
}
