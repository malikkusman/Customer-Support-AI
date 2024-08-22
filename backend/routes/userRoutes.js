const express = require("express");

const userController = require("../controllers/userController");
const {validates, registerValidator,  loginValidator} = require("../utils/validator");
const {verifyToken} = require("../utils/token");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/register", validates(registerValidator), userController.registerUser);
router.post("/login", validates(loginValidator), userController.loginUser);
router.get("/auth-status", verifyToken, userController.verifyUserStatus);
router.get("/logout", userController.logoutUser);

module.exports = router;




