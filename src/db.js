const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'backjs',
  password: 'XCV22B100',
  port: 5432, // Порт по умолчанию для PostgreSQL
  encoding: 'UTF8', // Используйте UTF8 как кодировку
});

module.exports = pool;
