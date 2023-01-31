/** @format */

const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.DATABASE_NAME || 'mande2',
  host: process.env.DATABASE_HOST || 'localhost',
  password: process.env.DATABASE_PASSWORD || '12345',
  user: process.env.DATABASE_USER || 'postgres',
  port: process.env.DATABASE_PORT || 5432,
});

module.exports = pool;

