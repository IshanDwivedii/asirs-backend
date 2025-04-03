const pool = require("../config/db.js");

const createAutomationRuleTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS automation_rules (
            id SERIAL PRIMARY KEY,
            name VARCHAR(225) NOT NULL,
            condition JSONB NOT NULL,
            action JSONB NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )
    `;
    await pool.query(query);
    console.log("Automation Rules table created successfully!");
};

module.exports = createAutomationRuleTable;