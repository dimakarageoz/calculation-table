import { IsNumber, IsString } from 'class-validator';

export class CellPosition {

    @IsString()
    public readonly row!: string;

    @IsNumber()
    public readonly cell!: number;
}

export class CellBody extends CellPosition {

    @IsNumber()
    public readonly value!: number;
}

export interface IMongooseExec {
    nModified: number;
}
