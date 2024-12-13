import { User } from "src/schemas/user.schema";

export class GetOneFinancialDTO{
    _id: string | unknown;
    userId: User;
    emergency_fund: number;
    variable_income: number;
    fixed_income: number;
    total: number;
    message: string;
    status: number;
}