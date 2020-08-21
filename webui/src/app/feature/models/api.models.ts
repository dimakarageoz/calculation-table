export interface ICellBody {
    value: number;
    cell: number;
    row: string;
}

export interface IRow {
    cells: Array<number>;
    _id: string;
}

export interface IRowList {
    rows: Array<IRow>;
}
