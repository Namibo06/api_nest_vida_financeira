import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from 'src/controllers/Item.controller';
import { ItemRepository } from 'src/repositories/ItemRepository';
import { itemSchema } from 'src/schemas/item.schema';
import { ItemService } from 'src/services/Item.service';
import { ItemUseCase } from 'src/use_cases/ItemUseCase';

@Module({
    imports: [MongooseModule.forFeature([{name: "Item", schema: itemSchema}]),],
    controllers: [ItemController],
    providers: [ItemUseCase,ItemService,ItemRepository]
})
export class ItemModule {}
