import { IsNegative, IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/schemas/user.schema";

export class CreateFinancialDTO{
    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    @IsNumber()
    @IsNegative()
    emergency_fund: number;

    @IsNotEmpty()
    @IsNumber()
    @IsNegative()
    variable_income: number;

    @IsNotEmpty()
    @IsNumber()
    @IsNegative()
    fixed_income: number;

    @IsNotEmpty()
    @IsNumber()
    @IsNegative()
    total: number;
}