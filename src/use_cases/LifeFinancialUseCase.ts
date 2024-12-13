import { Injectable } from "@nestjs/common";
import { CreateLifeFinancialDTO } from "src/dtos/life_financial/CreateLifeFinancialDTO";
import { UpdateLifeFinancialDTO } from "src/dtos/life_financial/UpdateLifeFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { NotFoundException } from "src/exceptions/NotFoundException";
import { UnprocessableEntityException } from "src/exceptions/UnprocessableEntityException";
import { LifeFinancial } from "src/schemas/life_financial.schema";
import { LifeFinancialService } from "src/services/LifeFinancial.service";

@Injectable()
export class LifeFinancialUseCase{
    constructor(
        private service: LifeFinancialService
    ){}

    async createLifeFinancialUseCase(data: CreateLifeFinancialDTO): Promise<MessageStatusDTO>{
        if(
            data.input_values === null || data.output_values === null ||
            data.balance_amount === null || data.user === null 
        ){
            throw new UnprocessableEntityException("Campos obrigatórios vazios");
        }

        return await this.service.create(data);
    }

    async getAllLifeFinancialsUseCase(userId: string): Promise<LifeFinancial[]>{
        return await this.service.getAll(userId);
    }

    async getOneLifeFinancialUseCase(id: string): Promise<LifeFinancial>{
        const existsLifeFinancial = await this.service.existsById(id);
        if(!existsLifeFinancial){
            throw new NotFoundException("Vida Financeira não encontrado");
        }

        return await this.service.getOne(id);
    }

    async updateLifeFinancialUseCase(id: string, data: UpdateLifeFinancialDTO): Promise<MessageStatusDTO>{
        const existsLifeFinancial = await this.service.existsById(id);
        if(!existsLifeFinancial){
            throw new NotFoundException("Vida Financeira não encontrado");
        }

        return await this.service.update(id,data);
    }

    async deleteLifeFinancialUseCase(id: string): Promise<MessageStatusDTO>{
        const existsLifeFinancial = await this.service.existsById(id);
        if(!existsLifeFinancial){
            throw new NotFoundException("Vida Financeira não encontrado");
        }

        return await this.service.delete(id);
    }
}