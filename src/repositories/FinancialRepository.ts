import { CreateFinancialDTO } from "src/dtos/financial/CreateFinancialDTO";
import { UpdateFinancialDTO } from "src/dtos/financial/UpdateFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { FinancialInterface } from "src/interfaces/FinancialInterface";
import { Financial } from "src/schemas/financial.schema";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { LifeFinancial } from "src/schemas/life_financial.schema";
import { InternalServerErrorException } from "src/exceptions/InternalServerErrorException";

export class FinancialRepository implements FinancialInterface{
    constructor(
        @InjectModel(LifeFinancial.name) private model: Model<LifeFinancial>
    ){}

    async create(data: CreateFinancialDTO): Promise<MessageStatusDTO> {
        const financial = new this.model(data);
        const createdFinancial = financial.save();
        if(!createdFinancial){
            throw new InternalServerErrorException("Não foi possivel criar um financeiro");
        }

        return {
            message: "Financeiro criado",
            status: 201
        };
    }

    async getAll(): Promise<Financial[]> {
        return await this.model.find();
    }

    async getOne(id: string): Promise<Financial> {
        return await this.model.findById(id);
    }

    async update(id: string, data: UpdateFinancialDTO): Promise<MessageStatusDTO> {
        const updatedFinancial = await this.model.findByIdAndUpdate(id, data,{new: true});
        if(!updatedFinancial){
            throw new InternalServerErrorException("Não foi possivel atualizar um financeiro");
        }

        return {
            message: "Financeiro atualizado",
            status: 200
        };
    }

    async delete(id: string): Promise<MessageStatusDTO> {
        const deletedFinancial = await this.model.findByIdAndDelete(id);
        if(!deletedFinancial){
            throw new InternalServerErrorException("Não foi possivel deletar um financeiro");
        }

        return {
            message: "Financeiro deletado",
            status: 204
        };
    }

    async existsById(id: string): Promise<Boolean> {
        const existsFinancial = await this.model.findById(id);
        return existsFinancial ? true : false;
    }
    
}