const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect().then(() => {
  console.log("Connected to the database successfully!");
}).catch((err) => {
  console.error("Database connection error:", err.stack);
});

module.exports = pool;
// This code connects to a PostgreSQL database using the `pg` library. It retrieves the database connection details from environment variables defined in a `.env` file. After establishing the connection, it logs a success message or an error message if the connection fails. The `pool` object is exported for use in other parts of the application.