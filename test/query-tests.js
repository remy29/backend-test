const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
require('dotenv').config();
const should = chai.should();

const db = require('../db/queries');

chai.use(chaiHttp);

describe('Query functions', () => {

  beforeEach(() => {
    db.pool.query(`DROP TABLE IF EXISTS transactions CASCADE;

    CREATE TABLE transactions (
      hash TEXT PRIMARY KEY, 
      total BIGINT,
      fees BIGINT,
      inputs JSON,
      outputs JSON
    );
    INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES ('000', 123, 456, '[1,3,3]', '[1,5,6]'); 
    `, (error, results) => {
      if (error) {
				throw error;
			}
    })
  });

	describe('updateTransactions', () => {
		it('does not add a new entry to the database if it is  not unique', (done) => {

      db.pool.query("INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES ('000', 123, 456, '[1,3,3]', '[1,5,6]');", (error, results) => {
        if (error) {
          error.code.should.equal('23505');
          done();
        }
  
      });
				
		});
	});

	
});
