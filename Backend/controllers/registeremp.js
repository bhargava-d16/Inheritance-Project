const { EModel } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
// Register function
const registeremp = async (req, res, next) => {
  const { error: validationError } = validateEmployer(req.body);

  if (validationError) {
    return res
      .status(400)
      .json({ message: validationError.details[0].message });
  }

  const { username, email, password } = req.body;

  try {
    const formattedName = username.toLowerCase();
    const formattedEmail = email.toLowerCase();

    // Check if the user already exists
    const existingEmployer = await EModel.findOne({ email: formattedEmail });
    if (existingEmployer) {
      return res.status(400).json({ message: "This user already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employer
    const newEmployer = new EModel({
      username: formattedName,
      email: formattedEmail,
      password: hashedPassword,
    });

    await newEmployer.save();
    const accessToken = jwt.sign(
      {
        username: newEmployer.formattedName,
        empId: newEmployer._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      message: "Employer registered successfully",
      token: accessToken,
    });
  } catch (err) {
    next(err); // Pass error to the error-handling middleware
  }
};

module.exports = registeremp;

// Validation function
function validateEmployer(data) {
  const EModel = joi.object({
    username: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(12).required(),
  });
  return EModel.validate(data);
}
