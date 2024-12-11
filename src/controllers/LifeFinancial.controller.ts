import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateLifeFinancialDTO } from "src/dtos/life_financial/CreateLifeFinancialDTO";
import { UpdateLifeFinancialDTO } from "src/dtos/life_financial/UpdateLifeFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { LifeFinancial } from "src/schemas/life_financial.schema";
import { LifeFinancialUseCase } from "src/use_cases/LifeFinancialUseCase";

@Controller('life_financial')
export class LifeFinancialController{
    constructor(
        private readonly useCase: LifeFinancialUseCase
    ){}

    @Post('create')
    async createLifeFinancial(@Body() data: CreateLifeFinancialDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.createLifeFinancialUseCase(data);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Get('get_all')
    async getAllLifeFinancials(): Promise<LifeFinancial[] | MessageStatusDTO>{
        try {
            return await this.useCase.getAllLifeFinancialsUseCase();
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Get('get_one/:id')
    async getOneLifeFinancial(@Param('id') id: string): Promise<LifeFinancial | MessageStatusDTO>{
        try {
            return await this.useCase.getOneLifeFinancialUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Patch('update/:id')
    async updateLifeFinancial(@Param('id') id: string, @Body() data: UpdateLifeFinancialDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.updateLifeFinancialUseCase(id,data);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Delete('destroy/:id')
    async deleteLifeFinancial(@Param('id') id: string): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.deleteLifeFinancialUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }
}