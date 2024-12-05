import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserSchema } from "./user.schema";
import { StatusGoals } from "src/enums/status.enum";

@Schema()
export class GoalsSchema extends Document{
    @Prop({required: true, maxlength: 50})
    title: string;

    @Prop({required: true})
    status: StatusGoals;

    @Prop({required: true})
    number_status: number;

    @Prop({required: true, type: [{type: 'ObjectId', ref: 'UserSchema'}]})
    user: UserSchema;
}

export const goalsSchema = SchemaFactory.createForClass(GoalsSchema);