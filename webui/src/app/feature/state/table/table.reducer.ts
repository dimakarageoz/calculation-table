import { Action, createReducer, on } from '@ngrx/store';
import { newTableDataCome } from './table.actions';
import { IRow } from '../../models/api.models';
import { INewTableData } from './table.models';
import { TABLE_INIT_STATE } from '../state.constants';

const actionReducer = createReducer(
    TABLE_INIT_STATE,
    on(newTableDataCome, (state: Array<IRow>, { data }: INewTableData) => ([...data.rows])),
);

export function tableReducer(state: Array<IRow> | undefined, action: Action): Array<IRow> {
    return actionReducer(state, action);
}
