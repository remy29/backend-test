const axios = require('axios');
const db = require('../db/queries');

const getUnconfirmedTrans = function () {
  axios.get("https://api.blockcypher.com/v1/btc/main/txs")
    .then((res) => {

      let biggestTotal = 0;
      let biggestTransaction = []; 

      for (const transaction of res.data) {

        if (biggestTransaction.length > 0 && biggestTransaction[0].hash === transaction.hash) {
          console.log('same hash')
          continue;
        }

        if (transaction.total > biggestTotal) {
          biggestTotal = transaction.total
          biggestTransaction.push(transaction);
        }
      }

      const readyInputs = biggestTransaction[0].inputs.map((input) => {
        return (
          {
            output_value: input.output_value,
            addresses: input.addresses,
            script_type: input.script_type
          }
        )
      });
      
      const readyOutputs = biggestTransaction[0].outputs.map((output) => {
        return (
          {
            value: output.value,
            addresses: output.addresses,
            script_type: output.script_type
          }
        )
      });

      db.updateTransactions(biggestTransaction, readyInputs, readyOutputs);
    });
}

module.exports = getUnconfirmedTrans
