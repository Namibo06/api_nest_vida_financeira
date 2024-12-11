import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateFinancialDTO } from "src/dtos/financial/CreateFinancialDTO";
import { UpdateFinancialDTO } from "src/dtos/financial/UpdateFinancialDTO";
import { CreateLifeFinancialDTO } from "src/dtos/life_financial/CreateLifeFinancialDTO";
import { UpdateLifeFinancialDTO } from "src/dtos/life_financial/UpdateLifeFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { Financial } from "src/schemas/financial.schema";
import { LifeFinancial } from "src/schemas/life_financial.schema";
import { FinancialUseCase } from "src/use_cases/FinancialUseCase";
import { LifeFinancialUseCase } from "src/use_cases/LifeFinancialUseCase";

@Controller('financial')
export class FinancialController{
    constructor(
        private readonly useCase: FinancialUseCase
    ){}

    @Post('create')
    async createFinancial(@Body() data: CreateFinancialDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.createFinancialUseCase(data);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Get('get_all')
    async getAllFinancials(): Promise<Financial[] | MessageStatusDTO>{
        try {
            return await this.useCase.getAllFinancialsUseCase();
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Get('get_one/:id')
    async getOneFinancial(@Param('id') id: string): Promise<Financial | MessageStatusDTO>{
        try {
            return await this.useCase.getOneFinancialUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Patch('update/:id')
    async updateFinancial(@Param('id') id: string, @Body() data: UpdateFinancialDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.updateFinancialUseCase(id,data);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }

    @Delete('destroy/:id')
    async deleteFinancial(@Param('id') id: string): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.deleteFinancialUseCase(id);
        } catch (error) {
            return {
                message: error.getMessage(),
                status: error.getStatusCode()
            };
        }
    }
}