DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE transactions (
  hash TEXT PRIMARY KEY, 
  total BIGINT,
  fees BIGINT,
  inputs JSON,
  outputs JSON
);

/* Dummy Data for testing */ 
/* INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES (000, 123, 456, '[1,3,3]', '[1,5,6]')  */

/* CREATE TABLE inputs (
  id SERIAL PRIMARY KEY,
  hash TEXT references transactions(hash),
  output_value BIGINT,
  addresses JSON,
  script_type VARCHAR(60)
) */

/* CREATE TABLE outputs (
  id SERIAL PRIMARY KEY,
  hash TEXT references transactions(hash),
  value BIGINT,
  addresses JSON,
  script_type VARCHAR(60)
) */
