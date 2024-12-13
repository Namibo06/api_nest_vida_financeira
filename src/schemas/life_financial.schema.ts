import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Item } from "./item.schema";
import { User } from "./user.schema";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class LifeFinancial extends Document{
    @Prop({required: true})
    input_values: number;

    @Prop({required: true})
    output_values: number;

    @Prop({required: true})
    balance_amount: number;

    @Prop({required: true, type: [{type: 'ObjectId', ref: 'User'}]})
    user: User;

    @Prop({required: true, type: [{type: 'ObjectId', ref: 'Item'}]})
    items: Item;
}

export const lifeFinancialSchema = SchemaFactory.createForClass(LifeFinancial);