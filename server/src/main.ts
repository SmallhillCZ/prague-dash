import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  if (configService.get("CORS_ENABLE")) app.enableCors({
    origin: [
      "http://localhost",
      "http://localhost:4000",
      "http://localhost:4200",
      "https://praguedash.cz"
    ]
  });

  const port = configService.get('PORT') ? Number(configService.get('PORT')) : 3000;

  await app.listen(port);
}
bootstrap();
