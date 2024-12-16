import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { endOfMonth, startOfMonth } from "date-fns";
import { Model } from 'mongoose';
import { CreateItemDTO } from "src/dtos/item/CreateItemDTO";
import { UpdateItemDTO } from "src/dtos/item/UpdateItemDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { InternalServerErrorException } from "src/exceptions/InternalServerErrorException";
import { NotFoundException } from "src/exceptions/NotFoundException";
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

    async getAll(userId: string,monthActual: string): Promise<Item[]> {
        const month = new Date(`${monthActual} 1, ${new Date().getFullYear()}`).getMonth();
        if (isNaN(month)) {
            throw new Error(`Mês inválido: ${monthActual}`);
        }
    
        const startDate = new Date(Date.UTC(new Date().getFullYear(), month, 1));
        const endDate = new Date(Date.UTC(new Date().getFullYear(), month + 1, 0, 23, 59, 59, 999));
    
        const items = await this.model.find({
            user: userId,
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            },
        });
    
        if (items.length === 0) {
            throw new NotFoundException("Items não encontrados");
        }
        return items;
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