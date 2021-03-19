const express = require('express');
const db = require('./db/queries');
const basicAuth = require('express-basic-auth')
const getUnconfirmedTrans = require('./helpers/api-request');
const app = express();
const port = 3000;
// YWRtaW46bmV0LWNlbnRz

app.use(basicAuth({
  users: { 'admin': 'net-cents' },
  unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
  return req.auth
      ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
      : 'No credentials provided'
}

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
