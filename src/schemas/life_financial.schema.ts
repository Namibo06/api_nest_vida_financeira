import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ItemSchema } from "./item.schema";
import { UserSchema } from "./user.schema";
import { Document } from 'mongoose';

@Schema()
export class LifeFinancialSchema extends Document{
    @Prop({required: true})
    input_values: number;

    @Prop({required: true})
    output_values: number;

    @Prop({required: true})
    balance_amount: number;

    @Prop({required: true, type: [{type: 'ObjectId', ref: 'UserSchema'}]})
    user: UserSchema;

    @Prop({required: true, type: [{type: 'ObjectId', ref: 'ItemSchema'}]})
    items: ItemSchema;
}

export const lifeFinancialSchema = SchemaFactory.createForClass(LifeFinancialSchema);