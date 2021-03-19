const express = require('express');
const app = express();
const db = require('./db/queries');
const getUnconfirmedTrans = require('./helpers/api-request');
const port = 3000;

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/transactions', db.getTransactions);

app.get('/reset', db.resetDatabase);

app.get('/biggest', db.getCurrentBiggest);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);

	setInterval(() => {
		getUnconfirmedTrans();
	}, 5000);
});
