import { Injectable } from "@nestjs/common";
import { CreateFinancialDTO } from "src/dtos/financial/CreateFinancialDTO";
import { UpdateFinancialDTO } from "src/dtos/financial/UpdateFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { FinancialInterface } from "src/interfaces/FinancialInterface";
import { FinancialRepository } from "src/repositories/FinancialRepository";
import { Financial } from "src/schemas/financial.schema";

@Injectable()
export class FinancialService implements FinancialInterface{
    constructor(
        private repository: FinancialRepository
    ){}

    async create(data: CreateFinancialDTO): Promise<MessageStatusDTO> {
       return await this.repository.create(data);
    }
    
    async getAll(): Promise<Financial[]> {
        return await this.repository.getAll();
    }
    
    async getOne(id: string): Promise<Financial> {
        return await this.repository.getOne(id);
    }
    
    async update(id: string, data: UpdateFinancialDTO): Promise<MessageStatusDTO> {
        return await this.repository.update(id,data);
    }
    
    async delete(id: string): Promise<MessageStatusDTO> {
        return await this.repository.delete(id);
    }
    
    async existsById(id: string): Promise<Boolean> {
        return await this.repository.existsById(id);
    }  
}