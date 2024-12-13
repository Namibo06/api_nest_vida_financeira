import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { OperationItem } from "src/enums/operation.enum";
import { User } from "./user.schema";

@Schema({ timestamps: true })
export class Item{
    @Prop({required: true, maxlength: 20})
    name: string;

    @Prop({required: true})
    operation: OperationItem;

    @Prop({required: true})
    price: number;

    @Prop({required: true, type: [{type: 'ObjectId', ref: 'User'}]})
    user: User;
}

export const itemSchema = SchemaFactory.createForClass(Item);