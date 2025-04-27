// controllers/auth.controller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, passwordHash, role || "user"]
    );

    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err)
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signup, login };
