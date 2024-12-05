import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:financas_tech')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
