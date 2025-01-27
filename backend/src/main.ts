<<<<<<< Updated upstream
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { Config } from "./config";
import { registerOpenAPI } from "./openapi";
import { registerTemplating } from "./templating";

async function bootstrap() {
	const logger = new Logger("MAIN");

	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(Config);

	if (config.server.cors) {
		app.enableCors();
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
=======
import { Logger, NestApplicationOptions } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Config, StaticConfig } from "./config";
import { runMigrations } from "./database/run-migrations";

async function bootstrap() {
  const logger = new Logger("MAIN");

  const options: NestApplicationOptions = {
    logger:
      StaticConfig.environment === "development"
        ? ["log", "debug", "error", "verbose", "warn"]
        : ["error", "warn", "log"],
  };

  if (StaticConfig.environment === "production") {
    await runMigrations(StaticConfig);
  }

  const app = await NestFactory.create(AppModule, options);

  const config = app.get(Config);

  if (config.environment === "development")
    app.enableCors({
      origin: ["http://localhost:4200"],
    });

  await app.listen(config.server.port, config.server.host);

  logger.log(`Server running on http://${config.server.host}:${config.server.port}`);
>>>>>>> Stashed changes
}
bootstrap();
