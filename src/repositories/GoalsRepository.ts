import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { InternalServerErrorException } from "src/exceptions/InternalServerErrorException";
import { GoalsInterface } from "src/interfaces/GoalsInterface";
import { Goals } from "src/schemas/goals.schema";
import { CreateGoalsDTO } from "src/dtos/goals/CreateGoalsDTO";
import { UpdateGoalsDTO } from "src/dtos/goals/UpdateGoalsDTO";
import { Injectable } from "@nestjs/common";
import { StatusGoals } from "src/enums/status.enum";

@Injectable()
export class GoalsRepository implements GoalsInterface{
    constructor(
        @InjectModel(Goals.name) private model: Model<Goals>
    ){}

    async create(data: CreateGoalsDTO): Promise<MessageStatusDTO> {
        const goals = new this.model(data);
        const createdGoals = goals.save();

        if(!createdGoals){
            throw new InternalServerErrorException("Não foi possivel criar uma meta");
        }

        return {
            message: "Meta criada",
            status: 201
        };
    }

    async getAll(): Promise<Goals[]> {
        return await this.model.find();
    }

    async getOne(id: string): Promise<Goals> {
        return await this.model.findById(id);
    }

    async update(id: string, data: UpdateGoalsDTO): Promise<MessageStatusDTO> {
        const updatedGoals = await this.model.findByIdAndUpdate(id, data,{new: true});
        if(!updatedGoals){
            throw new InternalServerErrorException("Não foi possivel atualizar uma meta");
        }

        return {
            message: "Meta atualizada",
            status: 200
        };
    }

    async delete(id: string): Promise<MessageStatusDTO> {
        const deletedGoals = await this.model.findByIdAndDelete(id);
        if(!deletedGoals){
            throw new InternalServerErrorException("Não foi possivel deletar uma meta");
        }

        return {
            message: "Meta deletada",
            status: 204
        };
    }

    async existsById(id: string): Promise<Boolean> {
        const existsGoals = await this.model.findById(id);
        return existsGoals ? true : false;
    }
    
}