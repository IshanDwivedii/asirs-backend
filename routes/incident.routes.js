const express = require('express');
const router = express.Router();
const {createIncident} = require("../controller/incident.controller.js");

router.post("/", createIncident);

module.exports = router;