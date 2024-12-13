import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "./user.schema";

@Schema({ timestamps: true })
export class Financial extends Document{
    @Prop({required: true, type: [{type: 'ObjectId', ref: 'User'}]})
    user: User;

    @Prop({required: true})
    emergency_fund: number;

    @Prop({required: true})
    variable_income: number;

    @Prop({required: true})
    fixed_income: number;

    @Prop({required: true})
    total: number;
}

export const financialSchema = SchemaFactory.createForClass(Financial);