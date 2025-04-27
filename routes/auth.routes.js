const express = require("express");
const { signup, login } = require("../controller/auth.controller");

const router = express.Router(); // ✅ Correct: only one router declaration

// Public auth routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
