import { IRowList } from '../../models/api.models';

export type TActions = 'createRow' | 'createColumn' | 'removeRow' | 'removeColumn' | 'updateCell';

export interface IModifyData {
    action: TActions;
    data?: any;
}

export interface INewTableData {
    data: IRowList;
}
