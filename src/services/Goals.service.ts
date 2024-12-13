import { Injectable } from "@nestjs/common";
import { CreateGoalsDTO } from "src/dtos/goals/CreateGoalsDTO";
import { UpdateGoalsDTO } from "src/dtos/goals/UpdateGoalsDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { GoalsInterface } from "src/interfaces/GoalsInterface";
import { GoalsRepository } from "src/repositories/GoalsRepository";
import { Goals } from "src/schemas/goals.schema";

@Injectable()
export class GoalsService implements GoalsInterface{
    constructor(
        private repository: GoalsRepository
    ){}

    async create(data: CreateGoalsDTO): Promise<MessageStatusDTO> {
       return await this.repository.create(data);
    }
    
    async getAll(userId: string): Promise<Goals[]> {
        return await this.repository.getAll(userId);
    }
    
    async getOne(id: string): Promise<Goals> {
        return await this.repository.getOne(id);
    }
    
    async update(id: string, data: UpdateGoalsDTO): Promise<MessageStatusDTO> {
        return await this.repository.update(id,data);
    }
    
    async delete(id: string): Promise<MessageStatusDTO> {
        return await this.repository.delete(id);
    }
    
    async existsById(id: string): Promise<Boolean> {
        return await this.repository.existsById(id);
    }  
}