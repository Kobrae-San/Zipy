import { client } from "../configs/database.config";

export async function RegisterModel(nickname: string, password: string) {
  console.log("coucou");
  return await client.query(
    `
        INSERT INTO users (nickname, password)  VALUES ($1, $2);
    `,
    [nickname, password]
  );
}

export async function LoginModel(nickname: string) {
  return client.query(
    `SELECT * FROM users WHERE nickname = $1;
      `,
    [nickname]
  );
}

export async function GetUserCredentials(nickname: string) {
  return await client.query(
    `
        SELECT nickname, password FROM users WHERE nickname = $1
    `,
    [nickname]
  );
}
