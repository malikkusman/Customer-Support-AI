const { User } = require("../models/User");
const { configureOpenAI } = require("../config/config");
const { OpenAIApi } = require("openai");

const createChat = async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //grabs chats of users
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    }));

    chats.push({ content: message, role: "user" });

    // save chats to user
    user.chats.push({ content: message, role: "user" });

    const configs = configureOpenAI();
    const openai = new OpenAIApi(configs);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    user.chats.push(chatResponse.data.choices[0].message);

    await user.save();

    return res.status(200).json({ message: "Chat created", chat: user.chats });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getAllChats = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "User chats", chats: user.chats });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteAllChats = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "User chats deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createChat,
  getAllChats,
  deleteAllChats,
};