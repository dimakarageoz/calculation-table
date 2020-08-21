import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const ROW_MODEL_NAME = 'rows';

@Schema()
export class Row extends Document {

    @Prop({
        required: true,
        type: [Number],
        default: [0]
    })
    public cells!: Array<number>;
}

export const RowSchema = SchemaFactory.createForClass(Row);
