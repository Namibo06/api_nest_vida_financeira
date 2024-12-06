import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exceptions/GlobalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
