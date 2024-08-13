const jwt = require("jsonwebtoken");

const generateToken = (id, email, expiresIn) => {
  const payload = { id, email };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token is required" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(decoded);
        }
      });
    });

    console.log("Token is valid");
    res.locals.jwtData = decoded;
    next();
  } catch (error) {
    console.log("Token is invalid");
    return res.status(401).json({ message: "Token is invalid" });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
