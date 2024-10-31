import { client } from "../configs/database.config";

export async function storedFiles(id_user: string) {
  return client.query(
    `
        SELECT file_name, file_data, file_size, mime_type FROM files WHERE id_user = $1
    `,
    [id_user]
  );
}
