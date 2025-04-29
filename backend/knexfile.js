require('dotenv').config({ path: '.env' });
const parse = require('pg-connection-string').parse;

// Parse the connection string
// console.log(process.env.DATABASE_URL);
const connectionConfig = parse(process.env.DATABASE_URL);


module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: connectionConfig.host,
      port: connectionConfig.port,
      user: connectionConfig.user,
      password: connectionConfig.password,
      database: connectionConfig.database,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './database/migrations'
    }
  },
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations',
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};