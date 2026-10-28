import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exection-filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { json } from 'express';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.use(json({limit:'10mb'}));
  app.enableCors({
    origin: '*',
    allowedHeaders:"*",
    methods: 'GET,PUT,POST,DELETE,PATCH,UPDATE,OPTIONS',
    credentials:true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV == 'production',
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = app.get(ConfigService);
  const port = config.get('NEST_PORT');
  await app.listen(port, () => logger.log(`App started at port: ${port}`));
}
bootstrap();
