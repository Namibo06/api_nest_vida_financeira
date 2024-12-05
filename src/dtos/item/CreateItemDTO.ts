import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OperationItem } from "src/enums/operation.enum";

export class CreateItemDTO{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(OperationItem, {message : 'O status deve ser: entrada ou saida'})
    operation: OperationItem;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}