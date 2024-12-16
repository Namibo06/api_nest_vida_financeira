
import { CreateItemDTO } from "src/dtos/item/CreateItemDTO";
import { UpdateItemDTO } from "src/dtos/item/UpdateItemDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { Item } from "src/schemas/item.schema";

export interface ItemInterface{
    create(data: CreateItemDTO): Promise<MessageStatusDTO>;
    getAll(userId: string, monthActual: string): Promise<Item[]>;
    getOne(id: string): Promise<Item>;
    update(id: string, data: UpdateItemDTO): Promise<MessageStatusDTO>;
    delete(id: string):Promise<MessageStatusDTO>;
    existsById(id: string): Promise<Boolean>;
}