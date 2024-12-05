import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { OperationItem } from "src/enums/operation.enum";

@Schema()
export class Item{
    @Prop({required: true, maxlength: 50})
    name: string;

    @Prop({required: true})
    operation: OperationItem;

    @Prop({required: true})
    price: number;
}

export const itemSchema = SchemaFactory.createForClass(Item);