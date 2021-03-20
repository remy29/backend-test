const express = require('express');
const db = require('./db/queries');
/* const basicAuth = require('express-basic-auth') */
const getUnconfirmedTrans = require('./helpers/api-request');
var httpsRedirect = require('express-https-redirect');
const app = express();
require('dotenv').config();
const port = process.env.PORT; 

app.use('/', httpsRedirect());

/* function getUnauthorizedResponse(req) {
  return req.auth
      ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
      : 'No credentials provided'
}

app.use(basicAuth({
  users: JSON.parse(process.env.USER_PASSWORD), 
  unauthorizedResponse: getUnauthorizedResponse
})) */

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get('/transactions', db.getTransactions);

app.get('/', db.getTransactions);

app.get('/reset', db.resetDatabase);

app.get('/biggest', db.getCurrentBiggest);

app.listen(port || 3002, () => {
	console.log(`App running on port ${port}.`);
	/* setInterval(() => {
		getUnconfirmedTrans();
	}, 300000); */
});

/* axios.get(
	'http://localhost:3000/transactions',
	{
		headers: {Authorization: 'Basic YWRtaW0LWNlbnRz'} 
	}
) */ // Request format
