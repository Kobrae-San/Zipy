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

export async function LoginModel(nickname: string, password: string) {
  return pool.execute(
      `SELECT * FROM users WHERE nickname = ?;
    `, [nickname]
  );
}
