-- create database tipoteka
--   with
--   owner = aamalyugin
--   encoding = 'UTF8'
--   template = template0
--   lc_collate = 'C'
--   lc_ctype = 'C'
--   connection limit = -1;

CREATE TABLE categories
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(100) UNIQUE NOT NULL
);

CREATE TABLE roles
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(100) NOT NULL
);

CREATE TABLE users
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  avatar varchar(50),
  password_hash varchar(255) NOT NULL,
  role_id integer NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE SET NULL
    ON UPDATE SET NULL
);

CREATE TABLE comments
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL
    ON UPDATE SET NULL
);

CREATE TABLE publications
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(255) NOT NULL,
  announcement varchar(255) NOT NULL,
  text text NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  picture varchar(50) NOT NULL,
  user_id integer NOT NULL,
  category_id integer NOT NULL,
  comment_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL
    ON UPDATE SET NULL,
  FOREIGN KEY (comment_id) REFERENCES comments(id)
    ON DELETE SET NULL
    ON UPDATE SET NULL
);

CREATE INDEX ON publications(title);