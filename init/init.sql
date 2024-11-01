CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   nickname VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE files (
   id SERIAL PRIMARY KEY,
   id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
   file_name VARCHAR(255) NOT NULL,
   file_data BYTEA NOT NULL,
   file_size BIGINT NOT NULL,
   mime_type VARCHAR(100),
   uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE share_tokens (
  id SERIAL PRIMARY KEY,
  file_id INTEGER NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  FOREIGN KEY (file_id) REFERENCES files(id)
);