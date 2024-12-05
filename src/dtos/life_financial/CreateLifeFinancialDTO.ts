import { IsNotEmpty, IsNumber } from "class-validator";
import { Item } from "src/schemas/item.schema";
import { User } from "src/schemas/user.schema";

export class CreateLifeFinancialDTO{
    @IsNotEmpty()
    @IsNumber()
    input_values: number;

    @IsNotEmpty()
    @IsNumber()
    output_values: number;

    @IsNotEmpty()
    @IsNumber()
    balance_amount: number;

    @IsNotEmpty()
    user: User;
    
    items: Item[];
}