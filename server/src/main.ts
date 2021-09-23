import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  if (configService.get("CORS_ENABLE")) app.enableCors();

  const port = configService.get('PORT') ? Number(configService.get('PORT')) : 3000;

  await app.listen(port);
}
bootstrap();
