const getUnconfirmedTrans = require('./helpers/api-request');

// calls getUnconfirmedTrans every 5 minutes

setInterval(() => {
	getUnconfirmedTrans();
}, 300000);

console.log('logging biggest unconfirmed transaction every 5 minutes...');
