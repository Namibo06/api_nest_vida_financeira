import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/schemas/item.schema';
import { Model } from 'mongoose';
import { Goals } from 'src/schemas/goals.schema';
import { Financial } from 'src/schemas/financial.schema';
import { ExportCsvOrExcelDTO } from 'src/dtos/ExportCsvOrExcelDTO';
import { PassThrough, Readable } from 'stream';
import { format } from 'fast-csv';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExportsCsvExcelService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<Item>,
       /// @InjectModel(Goals.name) private goalsModel: Model<Goals>,
       /// @InjectModel(Financial.name) private financialModel: Model<Financial>
    ){}

    async exportCsvItem(userId: string,data: ExportCsvOrExcelDTO): Promise<Readable>{
        const query: any = {};

        if (userId) {
            query.user = userId;
          }

        if (data.startDate && data.endDate) {
          query.createdAt = {
            $gte: new Date(data.startDate),
            $lte: new Date(data.endDate),
          };
        }
    
        const records = await this.itemModel.find(query).exec();
    
        const stream = new PassThrough();
        const csvStream = format({ headers: true });
    
        csvStream.pipe(stream);
    
        records.forEach((record) => {
          csvStream.write({
            Nome: record.name,
            Operacao: record.operation,
            Valor: record.price.toFixed(2)
          });
        });
    
        csvStream.end();
    
        return stream as Readable;
    }

    async exportExcelItem(userId: string,data: ExportCsvOrExcelDTO): Promise<Readable>{
        const query: any = {};

        if(userId){
            query.user = userId;
        }

        if (data.startDate && data.endDate) {
          query.createdAt = {
            $gte: new Date(data.startDate),
            $lte: new Date(data.endDate),
          };
        }
    
        const records = await this.itemModel.find(query).exec();
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Relatório de Registros');
    
        worksheet.columns = [
          { header: 'Nome', key: 'name', width: 30 },
          { header: 'Operação', key: 'operation', width: 20 },
          { header: 'Valor', key: 'price', width: 15 }
        ];
    
        records.forEach((record) => {
          worksheet.addRow({
            name: record.name,
            operation: record.operation,
            price: record.price.toFixed(2)
          });
        });
    
        worksheet.getRow(1).font = { bold: true };
    
        const stream = new PassThrough();
        await workbook.xlsx.write(stream);
    
        return stream as Readable;
    }

    exportCsvGoals(){}

    exportExcelGoals(){}

    exportCsvFinancial(){}

    exportExcelFinancial(){}
}
