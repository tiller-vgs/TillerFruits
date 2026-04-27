import { Pool } from "pg";

export const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "authdb",
  password: "admin",
  port: 5432,
});
