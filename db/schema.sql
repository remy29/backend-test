DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE transactions (
  hash TEXT PRIMARY KEY, 
  total INT,
  fees INT,
  inputs JSON,
  outputs JSON
);

