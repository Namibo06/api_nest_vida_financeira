import * as PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/schemas/item.schema';
import { Model } from 'mongoose';
import { generatePdfRequestDTO } from 'src/dtos/item/generatePdfRequestDTO';
import { PassThrough } from 'stream';

@Injectable()
export class PdfService {
    constructor(
        @InjectModel(Item.name) private repo: Model<Item>
    ){}

    async generatePdf(filters: generatePdfRequestDTO): Promise<NodeJS.ReadableStream> {
        const query: any = {};
    
        if (filters.startDate && filters.endDate) {
          query.createdAt = {
            $gte: new Date(filters.startDate),
            $lte: new Date(filters.endDate),
          };
        }
    
        const records = await this.repo.find(query).exec();
    
        const doc = new PDFDocument({ margin: 50 });
        const stream = new PassThrough();
    
        doc.pipe(stream);
    
        doc.fontSize(16).text('Relatório de Registros', { align: 'center' });
        doc.moveDown();
    
        doc.fontSize(12).text('Filtros aplicados:', { underline: true });
        if (filters.startDate && filters.endDate) {
          doc.text(`Data Inicial: ${filters.startDate}`);
          doc.text(`Data Final: ${filters.endDate}`);
        } else {
          doc.text('Sem filtros de data.');
        }
        doc.moveDown();
    
        this.drawTable(doc, records);
    
        doc.end();
        return stream;
      }
    
      private drawTable(doc: PDFKit.PDFDocument, records: any[]) {
        const startX = 50;
        let y = doc.y + 10;
    
        const columnWidths = [200, 150, 100];
        const headers = ['Nome', 'Operação', 'Valor'];
    
        doc.font('Helvetica-Bold').fontSize(10);
        headers.forEach((header, i) => {
          doc.text(header, startX + this.calculateOffset(columnWidths, i), y, {
            width: columnWidths[i],
            align: 'center',
          });
        });
    
        doc.moveTo(startX, y + 15).lineTo(startX + columnWidths.reduce((a, b) => a + b, 0), y + 15).stroke();
        y += 20;
    
        doc.font('Helvetica').fontSize(10);
        records.forEach((record) => {
          doc.text(record.name, startX, y, { width: columnWidths[0], align: 'center' });
          doc.text(record.operation, startX + columnWidths[0], y, {
            width: columnWidths[1],
            align: 'center',
          });
          doc.text(record.price.toFixed(2), startX + columnWidths[0] + columnWidths[1], y, {
            width: columnWidths[2],
            align: 'center',
          });
          y += 20;
    
          if (y > doc.page.height - 50) {
            doc.addPage();
            y = 50;
          }
        });
      }
    
      private calculateOffset(columnWidths: number[], index: number): number {
        return columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
      }
}
