import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExportsCsvExcelController } from 'src/controllers/ExportsCsvExcel.controller';
import { ItemController } from 'src/controllers/Item.controller';
import { PdfController } from 'src/controllers/Pdf.controller';
import { ItemRepository } from 'src/repositories/ItemRepository';
import { itemSchema } from 'src/schemas/item.schema';
import { ExportsCsvExcelService } from 'src/services/ExportsCsvExcel.service';
import { ItemService } from 'src/services/Item.service';
import { PdfService } from 'src/services/Pdf.service';
import { ItemUseCase } from 'src/use_cases/ItemUseCase';

@Module({
    imports: [MongooseModule.forFeature([{name: "Item", schema: itemSchema}]),],
    controllers: [ItemController,PdfController,ExportsCsvExcelController],
    providers: [ItemUseCase,ItemService,ItemRepository,PdfService,ExportsCsvExcelService]
})
export class ItemModule {}
