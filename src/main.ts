import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LoggerMiddleware } from './logger/logger.middleware';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(new LoggerMiddleware().use);

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
