const pool = require("../config/db.js");    

const createResponseTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        incident_id INT REFERENCES incidents(id) ON DELETE CASCADE,
        action_taken VARCHAR(255) NOT NULL, 
        executed_by INT REFERENCES users(id) ON DELETE SET NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
await pool.query(query);
console.log("Response table created successfully!");
}
module.exports = createResponseTable;
