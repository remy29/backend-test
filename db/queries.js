const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'me',
	host: 'localhost',
	database: 'api',
	password: 'password',
	port: 5432,
});

const getTransactions = (request, response) => {
	pool.query('SELECT * FROM transactions', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getCurrentBiggest = (request, response) => {
	let targetTotal;
	pool.query('SELECT * FROM transactions ORDER BY total DESC', (error, results) => {
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

const updateTransactions = (biggest, inputs, outputs) => {
	pool.query(
		'INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES ($1, $2, $3, $4, $5)',
		[biggest.hash, biggest.total, biggest.fees, JSON.stringify(inputs), JSON.stringify(outputs)],
		(error, results) => {
			if (error && error.code !== '23505') { // if unique contraint isn't met, will simply move on and not crash server
				console.log(error.code);
			}
			console.log('db update');
		}
	);
};

module.exports = {
	getTransactions,
	getCurrentBiggest,
	updateTransactions,
	pool,
};
