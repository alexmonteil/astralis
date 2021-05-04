const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const usersController = require("../controllers/users");
const { validateUser } = require("../middleware");




router.get("/register", usersController.renderRegisterForm);
router.post("/register", validateUser, catchAsync(usersController.registerUser));
router.get("/login", usersController.renderLoginForm);
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), usersController.loginUser);
router.get("/logout", usersController.logoutUser);


module.exports = router;