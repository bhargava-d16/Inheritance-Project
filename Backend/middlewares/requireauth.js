const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "You must be logged in" });
    }

    let token = authorization.split(" ")[1];

    // Remove extra quotes if present
    token = token.replace(/^"|"$/g, '');

    try {
        console.log("Extracted Token:", token);

        // Decode for debugging
        const decoded = jwt.decode(token, { complete: true });
        console.log("Decoded Token Payload:", decoded);

        // Verify the token
        const { empId } = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified Token empId:", empId);

        // Find user in the database
        const user = await UserModel.findOne({ _id: empId }).select('_id');

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ message: "Request is not authorized" });
    }
};

module.exports = requireAuth;
