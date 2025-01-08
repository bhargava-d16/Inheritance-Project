const {UserModel} = require("../models/user");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {EModel}=require("../models/user") 


const loginJS = async (req, res) => {
    try {
        const { username,password } = await req.body;
        const u = await UserModel.findOne({ username});
        if (!u) {
            return res.status(403).json({ msg: "Invalid Credentials Or User Does't Exist", success: false })
        }
        const x=await bcrypt.compare(password,u.password)
        if(x){
            const jwtToken=jwt.sign({username:u.username,_id:u._id},
                process.env.JWT_SECRET,
                {expiresIn:'24h'}
            )
            res.status(201).json({ msg: "Login Success!", success: true,jwtToken,username });
            // Creating jwt token
        }
        else res.status(403).json({ msg: "Invalid Credentials", success: false })
    } catch (error) {
        res.status(500).json({ msg: "Internal server issue", error })
    }

}
const signupJS = async (req, res) => {
    try {
        const { username, email, password } = await req.body;
        const u = await UserModel.findOne({ username});
        if (u) {
            return res.status(409).json({ msg: "User Exist", success: false })
        }
        const user = new UserModel({
            username,
            email,
            password
        })
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(201).json({ msg: "SignUp Success!", success: true });
    } catch (error) {
        res.status(500).json({ msg: "Internal server issue", error })
    }
}


const loginE = async (req, res) => {
    try {
        const { username,password } = await req.body;
        const u = await EModel.findOne({ username});
        if (!u) {
            return res.status(403).json({ msg: "Invalid Credentials Or User Does't Exist", success: false })
        }
        const x=await bcrypt.compare(password,u.password)
        if(x){
            const jwtToken=jwt.sign({username:u.username,_id:u._id},
                process.env.JWT_SECRET,
                {expiresIn:'24h'}
            )
            res.status(201).json({ msg: "Login Success!", success: true,jwtToken,username });
            // Creating jwt token
        }
        else res.status(403).json({ msg: "Invalid Credentials", success: false })
    } catch (error) {
        res.status(500).json({ msg: "Internal server issue", error })
    }

}
const signupE = async (req, res) => {
    try {
        const { username, email, password } = await req.body;
        const u = await EModel.findOne({ username});
        if (u) {
            return res.status(409).json({ msg: "User Exist", success: false })
        }
        const employer = new EModel({
            username,
            email,
            password
        })
        employer.password = await bcrypt.hash(password, 10);
        await employer.save();
        res.status(201).json({ msg: "SignUp Success!", success: true });
    } catch (error) {
        res.status(500).json({ msg: "Internal server issue", error })
    }
}
module.exports = {
    loginJS,
    signupJS,
    loginE,
    signupE
}
