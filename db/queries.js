require('dotenv').config();

const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// sets up connection to database using .env variables
const pool = new Pool({
	connectionString: connectionString,
});

// Queries database and return all results as JSON
const getTransactions = (request, response) => {
	pool.query('SELECT * FROM transactions', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

// Queries all totals in descending order, and uses first entry to find and return largest logged unconfirmed transaction
const getCurrentBiggest = (request, response) => {
	let targetTotal;
	pool.query('SELECT total FROM transactions ORDER BY total DESC', (error, results) => {
		if (error) {
			throw error;
		}
		targetTotal = results.rows[0] ? results.rows[0].total : 0;
		pool.query(`SELECT * FROM transactions WHERE total = ${targetTotal}`, (error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).json(results.rows);
		});
	});
};

// updates database with new entries
const updateTransactions = (biggest, inputs, outputs) => {
	pool.query(
		'INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES ($1, $2, $3, $4, $5)',
		[biggest.hash, biggest.total, biggest.fees, JSON.stringify(inputs), JSON.stringify(outputs)],
		(error, results) => {
			// if unique contraint isn't met, will simply move on and not crash server - not possible to store duplicates
			if (error && error.code !== '23505') {
				throw error;
			}
		}
	);
};

// Simple query to reset database for testing purposes
const resetDatabase = (request, response) => {
	pool.query(
		`DROP TABLE IF EXISTS transactions CASCADE; 
    CREATE TABLE transactions (
      hash TEXT PRIMARY KEY, 
      total BIGINT,
      fees BIGINT,
      inputs JSON,
      outputs JSON
    );`,
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).json({ response: 'reset complete' });
		}
	);
};

module.exports = {
	getTransactions,
	getCurrentBiggest,
	updateTransactions,
	resetDatabase,
	pool,
};
