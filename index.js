const express = require('express');
const db = require('./db/queries');

const getUnconfirmedTrans = require('./helpers/api-request');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT; 


app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(cors())

app.get('/transactions', db.getTransactions);

app.get('/reset', db.resetDatabase);

app.get('/biggest', db.getCurrentBiggest);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
	/* setInterval(() => {
		getUnconfirmedTrans();
	}, 5000); */
});

/* axios.get(
	'http://localhost:3000/transactions',
	{
		headers: {Authorization: 'Basic YWRtaW0LWNlbnRz'} 
	}
) */ // Request format
