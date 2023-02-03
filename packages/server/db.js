/** @format */

const { Pool } = require('pg');

const pool = new Pool({
  database: 'mande',
  host: 'database',
  password: 'admin',
  user: 'root',
  port: 5432,
});

module.exports = pool;

