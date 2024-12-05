import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserSchema } from "./user.schema";

@Schema()
export class FinancialSchema extends Document{
    @Prop({required: true, type: [{type: 'ObjectId', ref: 'UserSchema'}]})
    user: UserSchema;

    @Prop({required: true})
    emergency_fund: number;

    @Prop({required: true})
    variable_income: number;

    @Prop({required: true})
    fixed_income: number;

    @Prop({required: true})
    total: number;
}

export const financialSchema = SchemaFactory.createForClass(FinancialSchema);