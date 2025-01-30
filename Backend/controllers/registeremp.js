const { EModel } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const companyprofile = require("../models/companyprofile");
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
    const newcomapany=new companyprofile({
      username:formattedName,
      email:formattedEmail,
    })
    await newcomapany.save();
    
    console.log(newcomapany)
    res.status(200).json({
      message: "Employer registered successfully",
      token: accessToken,
      username:newEmployer.username
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
