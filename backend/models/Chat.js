const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const { type } = require("os");
const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = {
  Chat,
};
