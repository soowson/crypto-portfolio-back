import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as process from "process";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(
    cors({
      origin: 'http://localhost:3004',
      credentials: true,
      methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH'],
    }),
  );
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
