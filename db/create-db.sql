DROP DATABASE IF EXISTS typoteka WITH (FORCE);

CREATE DATABASE typoteka
  WITH
  OWNER = aamalyugin
  ENCODING = 'UTF8'
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  TABLESPACE = pg_default
  TEMPLATE = template0
  CONNECTION LIMIT = -1

