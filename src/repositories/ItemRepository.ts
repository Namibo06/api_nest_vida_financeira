import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateItemDTO } from "src/dtos/item/CreateItemDTO";
import { UpdateItemDTO } from "src/dtos/item/UpdateItemDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { InternalServerErrorException } from "src/exceptions/InternalServerErrorException";
import { ItemInterface } from "src/interfaces/ItemInterface";
import { Item } from "src/schemas/item.schema";

@Injectable()
export class ItemRepository implements ItemInterface{

    constructor(
        @InjectModel(Item.name) private model: Model<Item>
    ){}
    
    async create(data: CreateItemDTO): Promise<MessageStatusDTO> {
        const item = new this.model(data);
        const createdItem = await item.save();
        if(!createdItem){
            throw new InternalServerErrorException("Não foi possivel criar um item");
        }

        return {
            message: 'Item criado',
            status: 201
        };
    }

    async getAll(): Promise<Item[]> {
        return await this.model.find();
    }

    async getOne(id: string): Promise<Item> {
        return await this.model.findById(id);
    }

    async update(id: string, data: UpdateItemDTO): Promise<MessageStatusDTO> {
        const updatedItem = await this.model.findByIdAndUpdate(id,data, {new: true});
        if(!updatedItem){
            throw new InternalServerErrorException("Não foi possivel atualizar um item");
        }

        return {
            message: 'Item atualizado',
            status: 200
        };
    }

    async delete(id: string): Promise<MessageStatusDTO> {
        const deletedItem = await this.model.findByIdAndDelete(id);
        if(!deletedItem){
            throw new InternalServerErrorException("Não foi possivel deletar um item");
        }

        return {
            message: 'Item deletado',
            status: 204
        };
    }

    async existsById(id: string): Promise<Boolean> {
        const existsItem = await this.model.findById(id);
        return existsItem ? true : false;
    }
}