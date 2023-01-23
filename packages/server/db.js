/** @format */

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'db_mande_project123',
  host: 'database',
  port: 5432,
  database: 'mande',
});

module.exports = pool;
