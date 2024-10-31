CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   nickname VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE files (
   id SERIAL PRIMARY KEY,
   id_user INT NOT NULL,
   file_name VARCHAR(255) NOT NULL,
   file_type VARCHAR(255) NOT NULL,
   file_length VARCHAR(255) NOT NULL,
   uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);