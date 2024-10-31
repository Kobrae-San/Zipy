import { client } from "../configs/database.config";

export async function RegisterModel(nickname: string, password: string) {
  return await client.query(
    `
        INSERT INTO users (nickname, password)  VALUES ($1, $2);
    `,
    [nickname, password]
  );
}

export async function LoginModel(nickname: string) {
  return client.query(
    `SELECT id, nickname, password FROM users WHERE nickname = $1;
      `,
    [nickname]
  );
}
