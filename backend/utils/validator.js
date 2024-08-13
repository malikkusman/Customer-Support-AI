const { body, validationResult } = require("express-validator");

const validates = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({ errors: errors.array() });
  };
};

const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const registerValidator = [
  body("username")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters long"),
  body("email").trim().isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];

module.exports = {
  validates,
  loginValidator,
  registerValidator,
  chatCompletionValidator,
};
