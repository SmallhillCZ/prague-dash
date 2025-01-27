import { Logger, NestApplicationOptions, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { Config, StaticConfig } from "./config";
import { runMigrations } from "./database/run-migrations";
import { registerOpenAPI } from "./openapi";
import { registerTemplating } from "./templating";

async function bootstrap() {
  const logger = new Logger("MAIN");

  if (StaticConfig.environment === "production") {
    await runMigrations(StaticConfig);
  }

  const nestOptions: NestApplicationOptions = {
    logger:
      StaticConfig.environment === "development"
        ? ["log", "debug", "error", "verbose", "warn"]
        : ["error", "warn", "log"],
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, nestOptions);

  const config = app.get(Config);

  if (config.server.cors) {
    app.enableCors({
      origin: ["http://localhost:4200"],
    });
  }

  // uncomment to set global prefix for controllers (doesn't apply to static files and openapi)
  // app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // comment to disable templating
  registerTemplating(app);

  // comment to disable OpenAPI and Swagger
  registerOpenAPI("api", app, config);

  await app.listen(config.server.port, config.server.host);

  logger.log(`Server running on http://${config.server.host}:${config.server.port}`);
}

bootstrap();
