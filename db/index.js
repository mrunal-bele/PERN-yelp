require("dotenv").config();
const { Pool, Client } = require('pg')

const devConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
}
const pool = new Pool(devConfig);
const proConfig = {
    connectionString: process.env.DATABASE_URL
}

module.exports = {
    query: (text,params) => pool.query(text,params),
}