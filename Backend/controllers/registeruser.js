const { UserModel } = require('../models/user');
const UserProfile = require('../models/userprofile');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const registeruser = async (req, res, next) => {
    const { error: validationError } = validateUser(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError.details[0].message });
    }

    const { username, email, password } = req.body;

    try {
        const formattedName = username.toLowerCase();
        const formattedEmail = email.toLowerCase();

        const existingUser = await UserModel.findOne({ email: formattedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'This user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username: formattedName,
            email: formattedEmail,
            password: hashedPassword,
        });
        await newUser.save();
        const accessToken = jwt.sign(
            {
                username: formattedName,
                empId: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        const newUserProfile = new UserProfile({
            username: formattedName,
            email:formattedEmail,
        });
        await newUserProfile.save();

        res.status(200).json({ message: 'User registered successfully', token: accessToken,username:formattedName });
    } catch (err) {
        next(err);
    }
};

module.exports = registeruser;

// User validation function
function validateUser(data) {
    const userSchema = joi.object({
        username: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(12).required(),
    });
    return userSchema.validate(data);
}


