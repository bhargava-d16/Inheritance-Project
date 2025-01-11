const { UserModel } = require("../models/user");
const { EModel } = require("../models/user")
const UserProfile = require("../models/userprofile")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobsModel = require("../models/Jobs");


const mongoose = require('mongoose');

const loginJS = async (req, res) => {
    try {
        const { username, password } = await req.body;
        const u = await UserModel.findOne({ username });
        if (!u) {
            return res.status(403).json({ msg: "Invalid Credentials Or User Does't Exist", success: false })
        }
        const x = await bcrypt.compare(password, u.password)
        if (x) {
            const jwtToken = jwt.sign({ username: u.username, _id: u._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
            res.status(201).json({ msg: "Login Success!", success: true, jwtToken, username });

        }
        else res.status(403).json({ msg: "Invalid Credentials", success: false })
    } catch (error) {
        res.status(500).json({ msg: "Internal server issue", error })
    }

}

const signupJS = async (req, res) => {
    try {
        const { username, email, password } = await req.body;
        const u = await UserModel.findOne({ username });
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
        const { username, password } = await req.body;
        const u = await EModel.findOne({ username });
        if (!u) {
            return res.status(403).json({ msg: "Invalid Credentials Or User Does't Exist", success: false })
        }
        const x = await bcrypt.compare(password, u.password)
        if (x) {
            const jwtToken = jwt.sign({ username: u.username, _id: u._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            )
            res.status(201).json({ msg: "Login Success!", success: true, jwtToken, username });
        }
        else res.status(403).json({ msg: "Invalid Credentials", success: false })
    } catch (error) {
        res.status(500).json({ msg: "Internal server issue", error })
    }

}

const signupE = async (req, res) => {
    try {
        const { username, email, password } = await req.body;
        const u = await EModel.findOne({ username });
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

const getUserProfile = async (req, res) => {
    try {
        const username = req.params.username
        const data = await UserProfile.findOne({ username: username })
        if (!data) return res.status(404).json({ message: "User not found" });
        res.json(data);
    }
    catch (error) {

        res.status(500).json({ message: error.message, hello: "gand mara madarchod" });
    }
}

const PostJob = async (req, res) => {
    try {
        const details = await req.body;
        const job = new JobsModel({
            jobprofile: details.jobprofile,
            company: 'Oracle',
            location: details.location,
            salary: details.salary,
            type: details.type,
            description: details.desc,
            requirements: details.requirements,
            deadline: details.deadline,
            openings: details.openings,
            createdAt: new Date(),
        })
        await job.save();
        res.status(201).json({ msg: "Job posting Success!", success: true });
    } catch (error) {
        res.status(500).json({ msg: "Internal server issue", error })
    }
}


const sendJSdata = async (req,res) => {
    try {
        const userdata = await UserProfile.find();
        // Sorting data based on number of unique skills 
        userdata.forEach((data) => {
            data.skills = [...new Set(data.skills)];
        });
        userdata.sort((a, b) => b.skills.length - a.skills.length)
        if (userdata.length > 0) {
            res.json(userdata);
        } else {
            res.status(404).send({ msg: "Users data not found", success: false });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: "Internal server issue", error });
    }
}




module.exports = {
    loginJS,
    signupJS,
    loginE,
    signupE,
    PostJob,
    sendJSdata,
    getUserProfile
}
