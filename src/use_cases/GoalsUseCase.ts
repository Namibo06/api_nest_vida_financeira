import { Injectable } from "@nestjs/common";
import { CreateGoalsDTO } from "src/dtos/goals/CreateGoalsDTO";
import { UpdateGoalsDTO } from "src/dtos/goals/UpdateGoalsDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { NotFoundException } from "src/exceptions/NotFoundException";
import { UnprocessableEntityException } from "src/exceptions/UnprocessableEntityException";
import { Goals } from "src/schemas/goals.schema";
import { GoalsService } from "src/services/Goals.service";

@Injectable()
export class GoalsUseCase{
    constructor(
        private service: GoalsService
    ){}

    async createGoalslUseCase(data: CreateGoalsDTO): Promise<MessageStatusDTO>{
        if(
            data.title === "" || data.title === null
        ){
            throw new UnprocessableEntityException("Campos obrigatórios vazios");
        }

        return await this.service.create(data);
    }

    async getAllGoalsUseCase(): Promise<Goals[]>{
        return await this.service.getAll();
    }

    async getOneGoalsUseCase(id: string): Promise<Goals>{
        const existsGoals = await this.service.existsById(id);
        if(!existsGoals){
            throw new NotFoundException("Meta não encontrada");
        }

        return await this.service.getOne(id);
    }

    async updateGoalsUseCase(id: string, data: UpdateGoalsDTO): Promise<MessageStatusDTO>{
        const existsGoals = await this.service.existsById(id);
        if(!existsGoals){
            throw new NotFoundException("Meta não encontrada");
        }

        return await this.service.update(id,data);
    }

    async deleteGoalsUseCase(id: string): Promise<MessageStatusDTO>{
        const existsGoals = await this.service.existsById(id);
        if(!existsGoals){
            throw new NotFoundException("Meta não encontrada");
        }

        return await this.service.delete(id);
    }
}