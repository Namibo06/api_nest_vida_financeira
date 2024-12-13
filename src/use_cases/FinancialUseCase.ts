import { ConflictException, Injectable } from "@nestjs/common";
import { CreateFinancialDTO } from "src/dtos/financial/CreateFinancialDTO";
import { GetOneFinancialDTO } from "src/dtos/financial/GetOneFinancialDTO";
import { UpdateFinancialDTO } from "src/dtos/financial/UpdateFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { NotFoundException } from "src/exceptions/NotFoundException";
import { UnprocessableEntityException } from "src/exceptions/UnprocessableEntityException";
import { Financial } from "src/schemas/financial.schema";
import { FinancialService } from "src/services/Financial.service";

@Injectable()
export class FinancialUseCase{
    constructor(
        private service: FinancialService
    ){}

    async createFinancialUseCase(data: CreateFinancialDTO): Promise<MessageStatusDTO>{
        if(
            data.emergency_fund === null || data.variable_income === null ||
            data.fixed_income === null || data.user === null ||
            data.total === null
        ){
            throw new UnprocessableEntityException("Campos obrigatórios vazios");
        }

        const existsByUserId = await this.service.existsByUserId(data.user);
        if(!existsByUserId){
            return await this.service.create(data);
        }
    }

    async getAllFinancialsUseCase(): Promise<Financial[]>{
        return await this.service.getAll();
    }

    async getOneFinancialUseCase(id: string): Promise<Financial>{
        const existsFinancial = await this.service.existsById(id);
        if(!existsFinancial){
            throw new NotFoundException("Financeiro não encontrado");
        }

        return await this.service.getOne(id);
    }

    async updateFinancialUseCase(id: string, data: UpdateFinancialDTO): Promise<MessageStatusDTO>{
        const existsFinancial = await this.service.existsById(id);
        if(!existsFinancial){
            throw new NotFoundException("Financeiro não encontrado");
        }

        return await this.service.update(id,data);
    }

    async deleteFinancialUseCase(id: string): Promise<MessageStatusDTO>{
        const existsFinancial = await this.service.existsById(id);
        if(!existsFinancial){
            throw new NotFoundException("Financeiro não encontrado");
        }

        return await this.service.delete(id);
    }
}