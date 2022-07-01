const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'trackuser',
  password: 'complicated',
  database: 'demotracker',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
