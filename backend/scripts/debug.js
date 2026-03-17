require('dotenv').config();
const url = process.env.DATABASE_URL;
console.log('DATABASE_URL set:', !!url);
if (url) {
  console.log('Starts with:', url.substring(0, 40));
  console.log('Contains @:', url.includes('@'));
}

const pool = require('../src/db/pool');
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB connection FAILED:', err.message);
    console.error('Error code:', err.code);
  } else {
    console.log('DB connection OK. Server time:', res.rows[0].now);
  }
  pool.end();
});
