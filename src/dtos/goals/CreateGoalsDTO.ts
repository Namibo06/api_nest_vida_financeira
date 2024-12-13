import { IsEnum, IsNegative, IsString, MaxLength, MinLength } from "class-validator";
import { StatusGoals } from "src/enums/status.enum";
import { User } from "src/schemas/user.schema";

export class CreateGoalsDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(22)
    title: string;
   
    @IsEnum(StatusGoals, {message : 'O status deve ser: pensando, primeiros_passos, em_andamento ou concluido'})
    status: StatusGoals;

    @IsNegative()
    number_status: number;
  
    user: User;
}