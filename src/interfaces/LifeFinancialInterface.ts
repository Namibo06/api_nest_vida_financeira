
import { CreateLifeFinancialDTO } from "src/dtos/life_financial/CreateLifeFinancialDTO";
import { UpdateLifeFinancialDTO } from "src/dtos/life_financial/UpdateLifeFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { LifeFinancial } from "src/schemas/life_financial.schema";

export interface LifeFinancialInterface{
    create(data: CreateLifeFinancialDTO): Promise<MessageStatusDTO>;
    getAll(userId: string): Promise<LifeFinancial[]>;
    getOne(id: string): Promise<LifeFinancial>;
    update(id: string, data: UpdateLifeFinancialDTO): Promise<MessageStatusDTO>;
    delete(id: string):Promise<MessageStatusDTO>;
    existsById(id: string): Promise<Boolean>;
}