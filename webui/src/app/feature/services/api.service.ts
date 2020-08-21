import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICellBody, IRowList } from '../models/api.models';

enum ApiUrls {
    GetTableData = '/api/table',
    GetTableSum = '/api/table/sum',
    GetTableMultiply = '/api/table/multiply',
    CreateTableColumn = '/api/table/column',
    UpdateTableCell = '/api/table/cell',
    CreateTableRow = '/api/table/row',
    DropTableColumn = '/api/table/column/:index',
    DropTableRow = '/api/table/row/:id'
}

@Injectable()
export class ApiService {

    constructor(
        private httpClient: HttpClient
    ) {}

    public getTableData(): Observable<IRowList> {
        return this.httpClient.get<IRowList>(ApiUrls.GetTableData);
    }

    public getTableSum(): Observable<Array<number>> {
        return this.httpClient.get<Array<number>>(ApiUrls.GetTableSum);
    }

    public getTableMultiply(): Observable<Array<number>> {
        return this.httpClient.get<Array<number>>(ApiUrls.GetTableMultiply);
    }

    public createTableColumn(): Observable<void> {
        return this.httpClient.request<void>('post', ApiUrls.CreateTableColumn);
    }

    public createTableRow(): Observable<void> {
        return this.httpClient.request<void>('post', ApiUrls.CreateTableRow);
    }

    public updateTableCell(body: ICellBody): Observable<void> {
        return this.httpClient.patch<void>(ApiUrls.UpdateTableCell, body);
    }

    public removeTableColumn(index: number): Observable<void> {
        const url = ApiUrls.DropTableColumn.replace(':index', index + '');

        return this.httpClient.delete<void>(url);
    }

    public removeTableRow(id: string): Observable<void> {
        const url = ApiUrls.DropTableRow.replace(':id', id);

        return this.httpClient.delete<void>(url);
    }
}
