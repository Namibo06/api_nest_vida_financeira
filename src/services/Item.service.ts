import { CreateItemDTO } from "src/dtos/item/CreateItemDTO";
import { UpdateItemDTO } from "src/dtos/item/UpdateItemDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { ItemInterface } from "src/interfaces/ItemInterface";
import { ItemRepository } from "src/repositories/ItemRepository";
import { Item } from "src/schemas/item.schema";

export class ItemService implements ItemInterface{
    constructor(
        private repository: ItemRepository
    ){}

    async create(data: CreateItemDTO): Promise<MessageStatusDTO> {
       return await this.repository.create(data);
    }
    
    async getAll(): Promise<Item[]> {
        return await this.repository.getAll();
    }
    
    async getOne(id: string): Promise<Item> {
        return await this.repository.getOne(id);
    }
    
    async update(id: string, data: UpdateItemDTO): Promise<MessageStatusDTO> {
        return await this.repository.update(id,data);
    }
    
    async delete(id: string): Promise<MessageStatusDTO> {
        return await this.repository.delete(id);
    }
    
    async existsById(id: string): Promise<Boolean> {
        return await this.repository.existsById(id);
    }  
}