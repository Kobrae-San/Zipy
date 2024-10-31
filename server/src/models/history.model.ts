import { client } from "../configs/database.config";

export async function storedFile(id_user: string) {
  return client.query(`
        SELECT file_name, file_data, 
    `);
}
