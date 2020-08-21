export type TCalculationType = 'sum' | 'multiply' | null;

export interface ICalculatedRowStore {
    type: TCalculationType;
    rows: Array<number>;
}

export interface INewCalculationType {
    state: TCalculationType;
}

export interface INewRowData {
    rows: Array<number>;
}
