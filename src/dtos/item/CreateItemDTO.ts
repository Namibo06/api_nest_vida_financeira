import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OperationItem } from "src/enums/operation.enum";

export class CreateItemDTO{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    operation: OperationItem;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}