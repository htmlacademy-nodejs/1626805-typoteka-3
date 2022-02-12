create database tipoteka
  with
  owner = aamalyugin
  encoding = 'UTF8'
  template = template0
  lc_collate = 'C'
  lc_ctype = 'C'
  connection limit = -1;

create table categories
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(100) UNIQUE NOT NULL
);

create table roles
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(100) NOT NULL
);

create table users
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  avatar varchar(50),
  password_hash varchar(255) NOT NULL,
  role_id integer NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

create table comments
(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

create table publications
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
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (comment_id) REFERENCES comments(id)
);

CREATE INDEX ON publications(title);