import { createAction, props } from '@ngrx/store';
import { IModifyData, INewTableData } from './table.models';

export const loadTableData = createAction('[Feature Module] Load table data');
export const modifyTable = createAction('[Feature Module] Modify table', props<IModifyData>());
export const newTableDataCome = createAction('[Feature Module] Get new table data', props<INewTableData>());
