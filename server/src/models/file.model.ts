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
