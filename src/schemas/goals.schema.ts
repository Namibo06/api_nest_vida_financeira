import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "./user.schema";
import { StatusGoals } from "src/enums/status.enum";

@Schema({ timestamps: true })
export class Goals extends Document{
    @Prop({required: false, maxlength: 50})
    title: string;

    @Prop({required: false})
    status: StatusGoals;

    @Prop({required: false})
    number_status: number;

    @Prop({required: false, type: [{type: 'ObjectId', ref: 'User'}]})
    user: User;
}

export const goalsSchema = SchemaFactory.createForClass(Goals);