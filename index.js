require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet")
const morgan = require("morgan");
const pool = require("./config/db.js");
const PORT = process.env.PORT || 5000;
const app = express();
const userRoutes = require("./routes/user.routes.js");
const incidentRoutes = require('./routes/incident.routes.js');


const createUserTable = require("./models/user.model.js");
const {createIncidentTable} = require("./models/incident.model");
const createLogsTable = require("./models/log.model.js");
const createAutomationRuleTable = require("./models/automationRule.model.js");
const createResponseTable = require("./models/response.model.js");

//creating tables
const initDB = async () => {
  try {
    await createUserTable();
    await createIncidentTable();  
    await createLogsTable();
    await createAutomationRuleTable();
    await createResponseTable();
    console.log("All tables created successfully!");
  }
  catch (error) {
    console.error("Error creating tables", error);
  }
};
//initializing database on server start
initDB();


//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


// api routes
app.use("/api/users", userRoutes);
app.use("/api/incidents", incidentRoutes);


//default route
app.get("/", (req,res) => {
  res.send("ASIRS API Running!");

});


//test route
// app.get("/", (req, res) => {
//   res.send("Backend is up and running!");
// });

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, timestamp: result.rows[0].now });
  } catch (error) {
    console.error("Error connecting to the database", error);
    res.status(500).json({ success: false, error: error.message });
  }
});





//start server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});