
import { CreateFinancialDTO } from "src/dtos/financial/CreateFinancialDTO";
import { UpdateFinancialDTO } from "src/dtos/financial/UpdateFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { Financial } from "src/schemas/financial.schema";


export interface FinancialInterface{
    create(data: CreateFinancialDTO): Promise<MessageStatusDTO>;
    getAll(): Promise<Financial[]>;
    getOne(id: string): Promise<Financial>;
    update(id: string, data: UpdateFinancialDTO): Promise<MessageStatusDTO>;
    delete(id: string):Promise<MessageStatusDTO>;
    existsById(id: string): Promise<Boolean>;
}