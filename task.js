const getUnconfirmedTrans = require('./helpers/api-request');

setInterval(() => {
  getUnconfirmedTrans();
  console.log('dp up')
}, 300000);

console.log("logging biggest unconfirmed transaction every 5 minutes...")