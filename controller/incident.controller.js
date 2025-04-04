// business logic for incident
const IncidentModel = require("../models/incident.model");
//const {validateIncidentInput} = require("../utils/incidentValidator.js");

// post /api/incidents
const createIncident = async (req, res, next) => {
    try {
        const {title, description, severity, assigned_to} = req.body;

        //basic input validation
        // const errors = validateIncidentInput({title, description, severity});
        // if(errors) {
        //     return res.status(400).json({errors});
        // }
        //create incident
        const incident = await IncidentModel.createIncidentDB({
            title,
            description,
            severity,
            assigned_to: assigned_to || null,
        });
        return res.status(201).json({
            message: "Incident created successfully",
            incident,
          });
    }
    catch(err){
        console.error("Error creating incident:", err.message);
    }
};

module.exports = {
    createIncident,
};