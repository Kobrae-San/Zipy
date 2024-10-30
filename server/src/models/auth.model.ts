import { pool } from "../configs/database.config";

export async function RegisterModel(nickname: string, password: string) {
  console.log("coucou");
  return await pool.execute(
    `
        INSERT INTO users (nickname, password)  VALUES (?, ?);
    `,
    [nickname, password]
  );
}
