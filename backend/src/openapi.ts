import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { OpenAPIObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { Config } from "./config";

/**
 * Generate OpenAPI document for this application.
 * This is not part of addSwaggerUI because it may contain app specific information as authentication details.
 */
export function generateOpenAPI(app: INestApplication, config: Config): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle("PragueDash API")
    .setDescription("API documentation for PragueDash API")
    .setVersion(config.app.version)
    .addServer(config.server.baseUrl)
    .build();

  const document = SwaggerModule.createDocument(app, builder, {
    operationIdFactory: (controllerKey: string, methodKey: string) => `${methodKey}`,
  });

  return document;
}
