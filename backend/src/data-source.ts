import { DataSource, DataSourceOptions } from "typeorm";

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env["DB_HOST"] || "localhost",
  port: process.env["DB_PORT"] ? Number(process.env["DB_PORT"]) : 5432,
  username: process.env["DB_USER"] || "postgres",
  password: process.env["DB_PASSWORD"] || "password",
  database: process.env["DB_DATABASE"] || "postgres",
  entities: ["dist/**/*.entity.js"],
  migrationsRun: true,
  migrations: ["dist/migrations/*.js"],
};

export default new DataSource(dbConfig);
