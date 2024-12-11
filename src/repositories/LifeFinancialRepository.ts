import { InjectModel } from "@nestjs/mongoose";
import { CreateLifeFinancialDTO } from "src/dtos/life_financial/CreateLifeFinancialDTO";
import { UpdateLifeFinancialDTO } from "src/dtos/life_financial/UpdateLifeFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { LifeFinancialInterface } from "src/interfaces/LifeFinancialInterface";
import { LifeFinancial } from "src/schemas/life_financial.schema";
import { Model } from 'mongoose';
import { InternalServerErrorException } from "src/exceptions/InternalServerErrorException";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LifeFinancialRepository implements LifeFinancialInterface{
    constructor(
        @InjectModel(LifeFinancial.name) private model: Model<LifeFinancial>
    ){}

    async create(data: CreateLifeFinancialDTO): Promise<MessageStatusDTO> {
        const lifeFinancial = new this.model(data);
        const createdLifeFinancial = await lifeFinancial.save();
        if(!createdLifeFinancial){
            throw new InternalServerErrorException('Não foi possivel criar vida financeira');
        }

        return {
            message: 'Vida financeira criada',
            status: 201
        };
    }

    async getAll(): Promise<LifeFinancial[]> {
        return await this.model.find();
    }

    async getOne(id: string): Promise<LifeFinancial> {
        return await this.model.findById(id);
    }

    async update(id: string, data: UpdateLifeFinancialDTO): Promise<MessageStatusDTO> {
        const updatedLifeFinancial = await this.model.findByIdAndUpdate(id, data, {new: true});
        if(!updatedLifeFinancial){
            throw new InternalServerErrorException('Não foi possivel atualizar vida financeira');
        }

        return {
            message: 'Vida financeira atualizada',
            status: 200
        };  
    }

    async delete(id: string): Promise<MessageStatusDTO> {
        const deletedLifeFinancial = await this.model.findByIdAndDelete(id);
        if(!deletedLifeFinancial){
            throw new InternalServerErrorException('Não foi possivel deletar vida financeira');
        }

        return {
            message: 'Vida financeira deletada',
            status: 204
        }; 
    }

    async existsById(id: string): Promise<Boolean> {
        const existsLifeFinancial = await this.model.findById(id);
        return existsLifeFinancial ? true : false;
    }
    
}