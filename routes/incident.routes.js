const express = require('express');
const router = express.Router();
const {createIncident} = require("../controller/incident.controller.js");
const { authenticateToken } = require('../middleware/auth.middleware.js');

router.post("/", authenticateToken,createIncident);

module.exports = router;