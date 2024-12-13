import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateItemDTO } from "src/dtos/item/CreateItemDTO";
import { UpdateItemDTO } from "src/dtos/item/UpdateItemDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { AuthGuard } from "src/middlewares/AuthGuard";
import { Item } from "src/schemas/item.schema";
import { ItemUseCase } from "src/use_cases/ItemUseCase";

@Controller('items')
export class ItemController{
    constructor(
        private readonly useCase: ItemUseCase
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createItem(@Body() data: CreateItemDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.createItemUseCase(data);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('get_all')
    async getAllItems(): Promise<Item[] | MessageStatusDTO>{
        try {
            return await this.useCase.getAllItemsUseCase();
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('get_one/:id')
    async getOneItem(@Param('id') id: string): Promise<Item | MessageStatusDTO>{
        try {
            return await this.useCase.getOneItemUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @UseGuards(AuthGuard)
    @Patch('update/:id')
    async updateItem(@Param('id') id: string, @Body() data: UpdateItemDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.updateItemUseCase(id,data);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @UseGuards(AuthGuard)
    @Delete('destroy/:id')
    async deleteItem(@Param('id') id: string): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.deleteItemUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }
}