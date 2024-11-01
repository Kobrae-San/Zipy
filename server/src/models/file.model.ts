import internal from "stream";
import { client } from "../configs/database.config";

export async function storedFiles(id_user: string) {
  return client.query(
    `
        SELECT id, file_name, file_data, file_size, mime_type FROM files WHERE id_user = $1
    `,
    [id_user]
  );
}

export async function uploadFiles(
  id_user: number,
  file_name: string,
  file_data: Buffer,
  file_size: number,
  mime_type: string
) {
  return client.query(
    `
    INSERT INTO files (id_user, file_name, file_data, file_size, mime_type) VALUES ($1, $2, $3, $4, $5) RETURNING id
  `,
    [id_user, file_name, file_data, file_size, mime_type]
  );
}

export async function selectFileById(id: string) {
  return client.query(
    `
    SELECT id, file_name, file_data, file_size, mime_type FROM files WHERE id = $1  
  `,
    [id]
  );
}

export async function deleteFileById(id: string) {
  return client.query(
    `
    DELETE FROM files WHERE id = $1  
  `,
    [id]
  );
}

export async function storeToken(
  file_id: string,
  token: string,
  expires_at: Date
) {
  return client.query(
    `
    INSERT INTO share_tokens (file_id, token, expires_at) VALUES ($1, $2, $3) 
  `,
    [file_id, token, expires_at]
  );
}

export async function selectToken(token: string) {
  return client.query(
    `
    SELECT file_id, expires_at FROM share_tokens WHERE token = $1    
  `,
    [token]
  );
}
