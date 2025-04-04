const express = require("express");
const pool = require("../config/db.js");

const router = express.Router();

//create user
router.post("/", async(req, res) => {
    const {name, email, password_hash, role} = req.body;
    try {
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, password_hash, role]
        );
        res.status(201).json(newUser.rows[0]);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})

//get user by id
router.get("/:id", async(req, res) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
        if(user.rows.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user.rows[0]); 
    }
    catch (err){
        res.status(500).json({error: err.message});
    }
})

//update user
router.put("/:id", async (req, res) => {
    const { name, email, password_hash, role } = req.body;
    try {
      const updatedUser = await pool.query(
        "UPDATE users SET name = $1, email = $2, password_hash = $3, role = $4 WHERE id = $5 RETURNING *",
        [name, email, password_hash, role, req.params.id]
      );
      res.json(updatedUser.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

//delete user
router.delete("/:id", async(req, res) => {
    try {
        await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
        res.json({message: "User deleted successfully"});

    }
    catch (err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;
// This code defines an Express router for handling user-related operations in a web application. It includes routes for creating a new user, retrieving a user by ID, updating user details, and deleting a user. Each route interacts with a PostgreSQL database using the `pool` object to execute SQL queries. The routes handle errors and return appropriate responses, including success messages and error messages in JSON format. The router is exported for use in other parts of the application.
