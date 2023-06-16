//.........Third-party Libraries & module....
const express = require("express");

//.........Custom Libraries & module....
const { UserRegister } = require("../controllers");

//Initialize the router
const router = express.Router();

//User registration
router.post("/register", UserRegister);

module.exports = router;
