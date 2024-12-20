import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateFinancialDTO } from "src/dtos/financial/CreateFinancialDTO";
import { GetOneFinancialDTO } from "src/dtos/financial/GetOneFinancialDTO";
import { UpdateFinancialDTO } from "src/dtos/financial/UpdateFinancialDTO";
import { MessageStatusDTO } from "src/dtos/user/MessageStatusDTO";
import { AuthGuard } from "src/middlewares/AuthGuard";
import { Financial } from "src/schemas/financial.schema";
import { FinancialUseCase } from "src/use_cases/FinancialUseCase";

@Controller('financial')
export class FinancialController{
    constructor(
        private readonly useCase: FinancialUseCase
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createFinancial(@Body() data: CreateFinancialDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.createFinancialUseCase(data);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('get_all')
    async getAllFinancials(): Promise<Financial[] | MessageStatusDTO>{
        try {
            return await this.useCase.getAllFinancialsUseCase();
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Get('get_one/:id')
    async getOneFinancial(@Param('id') id: string): Promise<Financial | MessageStatusDTO>{
        try {
            return await this.useCase.getOneFinancialUseCase(id);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Patch('update/:id')
    async updateFinancial(@Param('id') id: string, @Body() data: UpdateFinancialDTO): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.updateFinancialUseCase(id,data);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }

    @UseGuards(AuthGuard)
    @Delete('destroy/:id')
    async deleteFinancial(@Param('id') id: string): Promise<MessageStatusDTO>{
        try {
            return await this.useCase.deleteFinancialUseCase(id);
        } catch (error) {
            return {
                message: error.response,
                status: error.status
            };
        }
    }
}