DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE transactions (
  hash TEXT PRIMARY KEY, 
  total BIGINT,
  fees BIGINT,
  inputs JSON,
  outputs JSON
);

