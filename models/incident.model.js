const pool = require("../config/db.js");

const createIncidentTable = async () => {
    // Create incidents table if it doesn't exist
    // This code defines a function `createIncidentTable` that creates a PostgreSQL table named `incidents` if it doesn't already exist. The table has columns for incident ID, title, description, status, severity, detection timestamp, resolution timestamp, and a foreign key reference to the `users` table. The status and severity columns have constraints to allow only specific values. The function uses the `pool` object to execute the SQL query and logs a success message upon completion. The function is exported for use in other parts of the application.

const query = `
    CREATE TABLE IF NOT EXISTS incidents (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) CHECK (status IN ('open', 'in_progress', 'resolved')) DEFAULT 'open',
        severity VARCHAR(50) CHECK (severity IN ('low', 'medium', 'high')) NOT NULL,
        detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP ,
        assigned_to INT REFERENCES users(id) ON DELETE SET NULL
    );
`;

await pool.query(query);
console.log("Incidents table created successfully!");
};




// This code defines a function `createIncidentDB` that inserts a new incident record into the `incidents` table in a PostgreSQL database. The function takes an object with properties such as title, description, severity, status, detected_at timestamp, and assigned_to user ID. It constructs an SQL query to insert the data and returns the newly created incident record. The function uses the `pool` object to execute the SQL query and is exported for use in other parts of the application.
const createIncidentDB = async ({ title, description, status, severity, detected_at, resolved_at, assigned_to }) => {
    const query = `
      INSERT INTO incidents (title, description, status, severity, detected_at, resolved_at, assigned_to)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
  
    const values = [
      title,
      description,
      status || 'open',
      severity,
      detected_at || new Date(),
      resolved_at || null,
      assigned_to || null,
    ];
  
    const { rows } = await pool.query(query, values);
    return rows[0];
  };
  
  module.exports = { createIncidentTable, createIncidentDB };