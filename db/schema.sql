DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE transactions (
  hash TEXT PRIMARY KEY, 
  total BIGINT,
  fees BIGINT,
  inputs JSON,
  outputs JSON
);

/* below are potential additional tables, I kept the erd schema very simple to reduce in algorithmic complexity, 
as upating the 3 tables would require a nested loop.
 */

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
