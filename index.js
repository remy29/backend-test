const express = require('express')
const app = express()
const db = require('./queries')
const port = 3000
const axios = require('axios');

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/transactions', db.getTransactions);
app.get('/biggest', db.getCurrentBiggest);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)

  axios.get('https://localhost:3000/transactions').then(res => {console.log(res)})

  /* setInterval(() => {
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

      db.pool.query('INSERT INTO transactions (hash, total, fees, inputs, outputs) VALUES ($1, $2, $3, $4, $5)', [biggestTransaction[0].hash, biggestTransaction[0].total, biggestTransaction[0].fees, JSON.stringify(readyInputs), JSON.stringify(readyOutputs)], (error, results) => {
        if (error) {
          throw error
        }
        console.log('db update');
      })
    });
  }, 300000); */
})