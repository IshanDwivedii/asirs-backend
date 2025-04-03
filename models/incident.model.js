const pool = require("../config/db.js");

const createIncidentTable = async () => {
    // Create incidents table if it doesn't exist
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

module.exports = createIncidentTable;
// This code defines a function `createIncidentTable` that creates a PostgreSQL table named `incidents` if it doesn't already exist. The table has columns for incident ID, title, description, status, severity, detection timestamp, resolution timestamp, and a foreign key reference to the `users` table. The status and severity columns have constraints to allow only specific values. The function uses the `pool` object to execute the SQL query and logs a success message upon completion. The function is exported for use in other parts of the application.