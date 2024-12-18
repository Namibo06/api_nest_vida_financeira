import { Body, Controller, Post, Res } from '@nestjs/common';
import { generatePdfRequestDTO } from 'src/dtos/item/generatePdfRequestDTO';
import { PdfService } from 'src/services/Pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
    constructor(private readonly service: PdfService){}

    @Post('generate/:uuid')
    async generatePDF(@Body() filters: generatePdfRequestDTO, @Res() res: Response): Promise<void> {
        try {
        const pdfStream = await this.service.generatePdf(filters);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=relatorio.pdf',
        });

        pdfStream.pipe(res);
        
        } catch (error) {
            res.status(error.status || 500).json({
                message: error.message,
                status: error.status || 'error',
            });
        }
    }

}
