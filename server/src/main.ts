import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {

  const options: NestApplicationOptions = {
    logger: process.env["NODE_ENV"] === "development" ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['error', 'warn', 'log'],
  };

  const app = await NestFactory.create(AppModule, options);

  const configService = app.get(ConfigService);

  if (process.env["NODE_ENV"] === "development") app.enableCors({
    origin: [
      "http://localhost:4200"
    ]
  });

  const port = configService.get('PORT') ? Number(configService.get('PORT')) : 3000;

  await app.listen(port);
}
bootstrap();
