const Users = require('../models/user');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt=require ('jsonwebtoken')

const registeruser = async (req, res, next) => {
    const { error: validationError } = validateUser(req.body);

    if (validationError) {
        return res.status(400).json({ message: validationError.details[0].message });
    }
    const { username, email, password } = req.body;

    try {
        const formattedName = username.toLowerCase();
        const formattedEmail = email.toLowerCase();

    
        const existingUser = await Users.findOne({ email: formattedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "This user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new Users({
            username: formattedName,
            email: formattedEmail,
            password: hashedPassword,
        });

        await newUser.save();
        const accessToken = jwt.sign(
                            {
                                email: formattedEmail,
                                empId: newUser._id,
                            },
                            process.env.JWT_SECRET, 
                            { expiresIn: "7d" } 
                        );
        res.status(200).json({ message: 'User registered successfully',token:accessToken});
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

