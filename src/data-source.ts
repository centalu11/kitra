import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { entities } from "./entities";
import { migrations } from "./migrations";

dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.TYPEORM_HOST ?? "localhost",
  port: process.env.TYPEORM_PORT ? parseInt(process.env.TYPEORM_PORT) : 3306,
  username: process.env.TYPEORM_USERNAME ?? "root",
  password: process.env.TYPEORM_PASSWORD ?? "",
  database: process.env.TYPEORM_DATABASE ?? "kitra",
  synchronize:
    process.env.TYPEORM_SYNCHRONIZE &&
    process.env.TYPEORM_SYNCHRONIZE === "true"
      ? true
      : false,
  logging:
    process.env.TYPEORM_LOGGING && process.env.TYPEORM_LOGGING === "true"
      ? true
      : false,
  migrationsTableName: "migrations",
  entities,
  migrations,
});

export default dataSource;
