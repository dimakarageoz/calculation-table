import { ICalculatedRowStore } from './calculated-data/calculated-data.models';
import { IErrorState } from './errors/errors.models';
import { IRow } from '../models/api.models';

export const LOADER_INIT_STATE: boolean = false;
export const TABLE_INIT_STATE: Array<IRow> = [];

export const ERROR_INIT_STATE: IErrorState = {
    message: ''
};

export const CALCULATED_DATA_INIT_STATE: ICalculatedRowStore = {
    type: null,
    rows: []
};
