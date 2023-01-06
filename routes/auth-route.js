const express = require("express");

const router = express.Router();

const { signUpUser, signInUser } = require("../controllers/auth-controller");

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

module.exports = router;
