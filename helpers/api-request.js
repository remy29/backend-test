const axios = require('axios');
const db = require('../db/queries');

const getUnconfirmedTrans = function () {
	// API call to blockcypher
	axios
		.get('https://api.blockcypher.com/v1/btc/main/txs')
		.then((res) => {
			let biggestTotal = 0;

			let biggestTransaction = {};

			// loops through results to select largest total
			for (const transaction of res.data) {
				if (transaction.total > biggestTotal) {
					biggestTotal = transaction.total;
					biggestTransaction = { ...transaction };
				}
			}

			// reformats inputs to specification in prompt
			const readyInputs = biggestTransaction.inputs.map((input) => {
				return {
					output_value: input.output_value,
					addresses: input.addresses,
					script_type: input.script_type,
				};
			});

			// reformats outputs to specification in prompt
			const readyOutputs = biggestTransaction.outputs.map((output) => {
				return {
					value: output.value,
					addresses: output.addresses,
					script_type: output.script_type,
				};
			});

			//calls updateTransaction query function with newest data to log into database
			db.updateTransactions(biggestTransaction, readyInputs, readyOutputs);
		})
		.catch((err) => {
			throw err;
		});
};

module.exports = getUnconfirmedTrans;
