const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
require('dotenv').config();
const should = chai.should();
const db = require('../db/queries');

chai.use(chaiHttp);

const dummyData = {
	hash: '000',
	total: '123',
	fees: '456',
	inputs: [1, 3, 3],
	outputs: [1, 5, 6],
};

describe('Routes', () => {
	describe('/GET /', () => {
		//setup for each test
		beforeEach(() => {
			db.pool.query(
				`DROP TABLE IF EXISTS transactions CASCADE;
	
			CREATE TABLE transactions (
				hash TEXT PRIMARY KEY, 
				total BIGINT,
				fees BIGINT,
				inputs JSON,
				outputs JSON
			);
			INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES ('000', 123, 456, '[1,3,3]', '[1,5,6]'); 
			`,
				(error, results) => {
					if (error) {
						throw error;
					}
				}
			);
		});
		// tests to see if API returns an array with credentials
		it('it should GET all the transactions if authorized', (done) => {
			chai.request(server)
				.get('/')
				.auth(process.env.TEST_USER, process.env.TEST_PASSWORD)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
		// tests to see if connection is refused without credentials
		it('it should refuse connection to API if unauthorized', (done) => {
			chai.request(server)
				.get('/')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
		// Makes sure that data that is returned is correctly formatted
		it('it should return a data in the correct format', (done) => {
			chai.request(server)
				.get('/')
				.auth(process.env.TEST_USER, process.env.TEST_PASSWORD)
				.end((err, res) => {
					res.should.have.status(200);
					res.body[0].should.deep.equal(dummyData);
					done();
				});
		});
	});

	describe('/GET biggest', () => {
		//testing setup
		beforeEach(() => {
			db.pool.query(
				`DROP TABLE IF EXISTS transactions CASCADE;
	
			CREATE TABLE transactions (
				hash TEXT PRIMARY KEY, 
				total BIGINT,
				fees BIGINT,
				inputs JSON,
				outputs JSON
			);
			INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES ('000', 123, 456, '[1,3,3]', '[1,5,6]'); 
			INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES ('111', 246, 81012, '[1,3,3]', '[1,5,6]'); 
			`,
				(error, results) => {
					if (error) {
						throw error;
					}
				}
			);
		});
		//testing teardown
		afterEach(() => {
			db.pool.query(
				`DROP TABLE IF EXISTS transactions CASCADE;
	
			CREATE TABLE transactions (
				hash TEXT PRIMARY KEY, 
				total BIGINT,
				fees BIGINT,
				inputs JSON,
				outputs JSON
			);
			`,
				(error, results) => {
					if (error) {
						throw error;
					}
				}
			);
		});
		// Checks to see if /biggest route only returns one entry
		it('it should return an array containing only one entry', (done) => {
			chai.request(server)
				.get('/biggest')
				.auth(process.env.TEST_USER, process.env.TEST_PASSWORD)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.lengthOf(1);
					done();
				});
		});
	});
});
