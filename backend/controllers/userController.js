const { hash, compare } = require("bcrypt");
const { User } = require("../models/User");
const { generateToken } = require("../utils/token");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "All users", users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id, user.email, "7d");
    return res.status(201).json({ message: "User created", token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id, user.email, "7d");

    return res.status(200).json({ message: "User logged in", token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const verifyUserStatus = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "User is valid" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  verifyUserStatus,
  logoutUser,
};
