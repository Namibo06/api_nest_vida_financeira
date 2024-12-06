import { CreateItemDTO } from "src/dtos/item/CreateItemDTO";
import { UpdateItemDTO } from "src/dtos/item/UpdateItemDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { NotFoundException } from "src/exceptions/NotFoundException";
import { UnprocessableEntityException } from "src/exceptions/UnprocessableEntityException";
import { Item } from "src/schemas/item.schema";
import { ItemService } from "src/services/Item.service";

export class ItemUseCase{
    constructor(
        private service: ItemService
    ){}

    async createItemUseCase(data: CreateItemDTO): Promise<MessageStatusDTO>{
        if(
            data.name !== "" || data.name !== null ||
            data.operation !== null || data.price !== null 
        ){
            throw new UnprocessableEntityException("Campos obrigatórios vazios");
        }

        return await this.service.create(data);
    }

    async getAllItemsUseCase(): Promise<Item[]>{
        return await this.service.getAll();
    }

    async getOneItemUseCase(id: string): Promise<Item>{
        const existsItem = await this.service.existsById(id);
        if(!existsItem){
            throw new NotFoundException("Item não encontrado");
        }

        return await this.service.getOne(id);
    }

    async updateItemUseCase(id: string, data: UpdateItemDTO): Promise<MessageStatusDTO>{
        const existsItem = await this.service.existsById(id);
        if(!existsItem){
            throw new NotFoundException("Item não encontrado");
        }

        return await this.service.update(id,data);
    }

    async deleteItemUseCase(id: string): Promise<MessageStatusDTO>{
        const existsItem = await this.service.existsById(id);
        if(!existsItem){
            throw new NotFoundException("Item não encontrado");
        }

        return await this.service.delete(id);
    }
}