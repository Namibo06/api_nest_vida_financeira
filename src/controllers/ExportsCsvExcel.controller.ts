import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { ExportCsvOrExcelDTO } from 'src/dtos/ExportCsvOrExcelDTO';
import { ExportsCsvExcelService } from 'src/services/ExportsCsvExcel.service';
import { Response } from 'express';

@Controller('exports_csv_excel')
export class ExportsCsvExcelController {
    constructor(
        private readonly service: ExportsCsvExcelService
    ){}

    @Post('exports_item/:id')
    async exportCsvOrExcelItem(@Res() res: Response,@Param('id') userId: string,@Body() data: ExportCsvOrExcelDTO): Promise<void>{
        if(data.typeCsvOrExcel === 'csv'){
            const stream = await this.service.exportCsvItem(userId,data);

            res.set({
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=relatorio.csv',
            });
        
            stream.pipe(res);
        }else if(data.typeCsvOrExcel === 'excel'){
            const stream = await this.service.exportExcelItem(userId,data);

            res.set({
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=relatorio.csv',
            });
        
            stream.pipe(res);
        }
    }

    exportCsvOrExcelGoals(){}

    exportCsvOrExcelFinancial(){}
}
