const express = require('express');
const db = require('./db/queries');
const basicAuth = require('express-basic-auth');
const getUnconfirmedTrans = require('./helpers/api-request');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

function getUnauthorizedResponse(req) {
	return req.auth
		? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
		: 'No credentials provided';
}

app.use(
	basicAuth({
		users: JSON.parse(process.env.USER_PASSWORD),
		unauthorizedResponse: getUnauthorizedResponse,
	})
);

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/', db.getTransactions);

app.get('/reset', db.resetDatabase);

app.get('/biggest', db.getCurrentBiggest);

app.listen(port || 3002, () => {
	console.log(`App running on port ${port}.`);
	setInterval(() => {
		getUnconfirmedTrans();
	}, 300000);
});

module.exports = app;
