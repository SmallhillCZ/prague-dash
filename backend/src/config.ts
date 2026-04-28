import { Global, Injectable, Module } from "@nestjs/common";
import { ServeStaticModuleOptions } from "@nestjs/serve-static";
import { config } from "dotenv";
import * as path from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { FrontendConfigResponse } from "./modules/root/dto/root.dto";

config({ override: true, debug: true });

@Injectable()
export class Config {
  environment = process.env.NODE_ENV || "development";

  logging = {
    debug: process.env.LOG_DEBUG === "true" || process.env.LOG_DEBUG === "1",
    query: process.env.LOG_QUERY === "true" || process.env.LOG_QUERY === "1",
  };

  server = {
    port: process.env["PORT"] ? parseInt(process.env["PORT"]) : 3000,
    host: process.env["HOST"] || "127.0.0.1",
    globalPrefix: process.env.GLOBAL_PREFIX ?? "api",
    baseUrl: process.env.BASE_URL || `http://${process.env.HOST || "localhost"}:${process.env.PORT ?? 3000}`,
    cors: this.environment === "development",
  };

  app = {
    name: "PragueDash",
    version: process.env["VERSION"] || "DEV",
    baseUrl: this.getBaseUrl(),
  };

  db: PostgresConnectionOptions = {
    type: "postgres",
    schema: "public",
    host: process.env["DB_HOST"] || "localhost",
    port: process.env["DB_PORT"] ? Number(process.env["DB_PORT"]) : 5432,
    username: process.env["DB_USER"] || "postgres",
    password: process.env["DB_PASSWORD"] || "password",
    database: process.env["DB_DATABASE"] || "postgres",
    entities: [path.join(__dirname, "**/*.entity.{js,ts}")],
    migrationsRun: false,
    migrations: [path.join(__dirname, "database/migrations/**/*{.ts,.js}")],
    namingStrategy: new SnakeNamingStrategy(),
    logging: this.logging.query,
  };

  golemio = {
    token: process.env.GOLEMIO_TOKEN || "",
  };

  frontend: { serve: ServeStaticModuleOptions; config: FrontendConfigResponse } = {
    serve: {
      rootPath: path.resolve(__dirname, "../../../../frontend/apps/admin/dist"),
      serveRoot: "",
    },

    config: {
      mapyComApiKey: process.env.MAPY_COM_API_KEY || "",
    },
  };

  private getBaseUrl() {
    if (process.env.BASE_URL) return process.env.BASE_URL;

    let url = `${this.server.port === 443 ? "https" : "http"}://${this.server.host}`;

    if (this.server.port !== 80 && this.server.port !== 443) url += `:${this.server.port}`;

    return url;
  }
}

@Global()
@Module({ providers: [Config], exports: [Config] })
export class ConfigModule {}

export const StaticConfig = new Config();
