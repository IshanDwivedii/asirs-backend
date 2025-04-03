const pool = require("../config/db");

const createLogsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      source_ip VARCHAR(50) NOT NULL,
      destination_ip VARCHAR(50),
      event_type VARCHAR(100) NOT NULL,
      event_data JSONB NOT NULL,
      detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log("Logs table created");
};

module.exports = createLogsTable;
