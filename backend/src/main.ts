import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {

  var environment = process.env.NODE_ENV || 'development';

  const options: NestApplicationOptions = {
    logger: environment === "development" ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['error', 'warn', 'log'],
  };

  const app = await NestFactory.create(AppModule, options);

  const configService = app.get(ConfigService);

  if (environment === "development") app.enableCors({
    origin: [
      "http://localhost:4200"
    ]
  });

  const port = configService.get('PORT') ? Number(configService.get('PORT')) : 3000;

  await app.listen(port);
}
bootstrap();
