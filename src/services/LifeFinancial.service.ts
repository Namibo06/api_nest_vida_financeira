import { CreateLifeFinancialDTO } from "src/dtos/life_financial/CreateLifeFinancialDTO";
import { UpdateLifeFinancialDTO } from "src/dtos/life_financial/UpdateLifeFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { LifeFinancialInterface } from "src/interfaces/LifeFinancialInterface";
import { LifeFinancialRepository } from "src/repositories/LifeFinancialRepository";
import { LifeFinancial } from "src/schemas/life_financial.schema";

export class LifeFinancialService implements LifeFinancialInterface{
    constructor(
        private repository: LifeFinancialRepository
    ){}

    async create(data: CreateLifeFinancialDTO): Promise<MessageStatusDTO> {
       return await this.repository.create(data);
    }
    
    async getAll(): Promise<LifeFinancial[]> {
        return await this.repository.getAll();
    }
    
    async getOne(id: string): Promise<LifeFinancial> {
        return await this.repository.getOne(id);
    }
    
    async update(id: string, data: UpdateLifeFinancialDTO): Promise<MessageStatusDTO> {
        return await this.repository.update(id,data);
    }
    
    async delete(id: string): Promise<MessageStatusDTO> {
        return await this.repository.delete(id);
    }
    
    async existsById(id: string): Promise<Boolean> {
        return await this.repository.existsById(id);
    }  
}