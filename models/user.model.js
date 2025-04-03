const pool = require("../config/db.js");

const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role VARCHAR(50) CHECK (role IN ('admin', 'analyst', 'viewer')) DEFAULT 'viewer',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await pool.query(query);
        console.log("User table created successfully!");
    };

    module.exports = createUserTable;
    // This code defines a function `createUserTable` that creates a PostgreSQL table named `users` if it doesn't already exist. The table has columns for user ID, name, email, password hash, role, and creation timestamp. The role column has a constraint to allow only specific values ('admin', 'analyst', 'viewer') with a default value of 'viewer'. The function uses the `pool` object to execute the SQL query and logs a success message upon completion. The function is exported for use in other parts of the application.  