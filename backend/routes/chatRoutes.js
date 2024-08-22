const express = require("express");
const { verifyToken } = require("../utils/token");
const { chatCompletionValidator, validates } = require("../utils/validator");
const chatController = require("../controllers/chatController");


const router = express.Router();

router.post("/new", validates(chatCompletionValidator), verifyToken, chatController.createChat);
router.get("/all-chats", verifyToken, chatController.getAllChats);
router.delete("/delete-all", verifyToken, chatController.deleteAllChats);

module.exports = router;                