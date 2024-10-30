import mysql from "mysql2/promise";
import { envConfig } from "./env.config";
import { Connection } from "mysql2";

envConfig();

const databaseConfig = async () => {
  const pool = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  return pool;
};

export const connectionDatabase = async (pool: mysql.Connection) => {
  try {
    await pool.query("SELECT 1");
  } catch (error) {
    console.error(error);
  }
};

export const pool: mysql.Connection = await databaseConfig();
