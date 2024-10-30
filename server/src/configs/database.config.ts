import pg from "pg";

import { envConfig } from "./env.config";

const { Pool } = pg;
envConfig();

const databaseConfig = async () => {
  const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  const client = await pool.connect();
  return client;
};

export const connectionDatabase = async (client: pg.PoolClient) => {
  try {
    await client.query("SELECT 1");
  } catch (error) {
    console.error(error);
  }
};

export const client: pg.PoolClient = await databaseConfig();
