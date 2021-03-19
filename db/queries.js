const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getTransactions = (request, response) => {
  pool.query('SELECT * FROM transactions', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCurrentBiggest = (request, response) => {
  let targetTotal;
  pool.query('SELECT * FROM transactions ORDER BY total DESC', (error, results) => {
    if (error) {
      throw error
    }
    targetTotal = results.rows[0].total;
    pool.query(`SELECT * FROM transactions WHERE total = ${targetTotal}`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  })
}

module.exports = {
  getTransactions,
  getCurrentBiggest,
  pool
}