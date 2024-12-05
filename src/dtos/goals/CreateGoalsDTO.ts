import { IsEnum, IsNegative, IsNotEmpty, IsString } from "class-validator";
import { StatusGoals } from "src/enums/status.enum";
import { User } from "src/schemas/user.schema";

export class CreateGoalsDTO{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsEnum(StatusGoals, {message : 'O status deve ser: pensando, primeiros_passos, em_andamento ou concluido'})
    status: StatusGoals;

    @IsNotEmpty()
    @IsNegative()
    number_status: number;

    @IsNotEmpty()
    user: User;
}