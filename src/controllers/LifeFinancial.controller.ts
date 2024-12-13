import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateLifeFinancialDTO } from "src/dtos/life_financial/CreateLifeFinancialDTO";
import { UpdateLifeFinancialDTO } from "src/dtos/life_financial/UpdateLifeFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { AuthGuard } from "src/middlewares/AuthGuard";
import { LifeFinancial } from "src/schemas/life_financial.schema";
import { LifeFinancialUseCase } from "src/use_cases/LifeFinancialUseCase";

@Controller('life_financial')
export class LifeFinancialController{
    constructor(
        private readonly useCase: LifeFinancialUseCase
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createLifeFinancial(@Body() data: CreateLifeFinancialDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.createLifeFinancialUseCase(data);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('get_all/:id')
    async getAllLifeFinancials(@Param('id') userId: string): Promise<LifeFinancial[] | MessageStatusDTO>{
        try {
            return await this.useCase.getAllLifeFinancialsUseCase(userId);
        } catch (error) {
            console.log("Erro: "+error);
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('get_one/:id')
    async getOneLifeFinancial(@Param('id') id: string): Promise<LifeFinancial | MessageStatusDTO>{
        try {
            return await this.useCase.getOneLifeFinancialUseCase(id);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Patch('update/:id')
    async updateLifeFinancial(@Param('id') id: string, @Body() data: UpdateLifeFinancialDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.updateLifeFinancialUseCase(id,data);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Delete('destroy/:id')
    async deleteLifeFinancial(@Param('id') id: string): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.deleteLifeFinancialUseCase(id);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }
}