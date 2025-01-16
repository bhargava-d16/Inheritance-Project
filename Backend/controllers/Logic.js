const { UserModel } = require("../models/user");
const { EModel } = require("../models/user")
const UserProfile = require("../models/userprofile")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobsModel = require("../models/Jobs");
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const shortlisted = require("../models/shortlist");
const companyprofile = require("../models/companyprofile");




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
        const { username, email, password } = req.body;
        const existingUser = await EModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ msg: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const employer = new EModel({
            username,
            email,
            password: hashedPassword
        });
        await employer.save();

        const jwtToken = jwt.sign({ username: employer.username, _id: employer._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        const userProfile = new companyprofile({
            username,
            email: email,
        });
        await userProfile.save();
        res.status(201).json({
            msg: "SignUp Success!",
            success: true,
            jwtToken,
            username
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ msg: "Internal server issue", error: error.message });
    }
};




const getUserProfile = async (req, res) => {
    try {
        const username = req.params.username
        const data = await UserProfile.findOne({ username: username })
        if (!data) return res.status(404).json({ message: "User not found" });
        res.json(data);
    }
    catch (error) {

        res.status(500).json({ message: error.message, hello: 'sfghjk wertyu sdfgh' });
    }
}




const PostJob = async (req, res) => {
    try {
        const { details } = req.body;

        if (!details || !details.jobprofile || !details.location || !details.salary) {
            return res.status(400).json({ msg: "Missing job details", success: false });
        }

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "JWT must be provided", success: false });
        }

        const jwtToken = authHeader.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

        console.log("Decoded JWT:", decoded);

        const job = new JobsModel({
            jobprofile: details.jobprofile,
            companyusername: decoded.username, 
            location: details.location,
            salary: details.salary,
            type: details.type,
            description: details.desc,
            requirements: details.requirements,
            deadline: details.deadline,
            openings: details.openings,
            createdAt: new Date(),
        });

        await job.save();
        
        res.status(201).json({ msg: "Job posting success!", success: true });
    } catch (error) {
        console.error("Error in PostJob:", error.message);
        res.status(500).json({ msg: "Internal server issue", error: error.message });
    }
};


const searchcandidates = async (req, res) => {
    try {
        const { search } = req.query;
        const data = await UserProfile.find();
        const results = data.filter(elem =>
            elem.name.toLowerCase().includes(search.toLowerCase()) ||
            elem.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
        );
        res.status(200).json({
            data: results,
        });

    } catch (error) {
        console.error("Search Unsuccessful:", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
};


const sendJSdata = async (req, res) => {
    try {
        const { filter, page = 1, limit = 10 } = req.query;
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "JWT must be provided", success: false });
        }

        const jwtToken = authHeader.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const companyid = decoded._id;

        let filterCriteria = {};
        if (filter === "notworking") {
            filterCriteria.currentlyworking = "";
        } else if (filter === "opentooffers") {
            filterCriteria.opentooffers = true;
        }

        const userdata = await UserProfile.find({
            ...filterCriteria,
        })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await UserProfile.countDocuments({
            ...filterCriteria,
        });

        const totalPages = Math.ceil(total / limit);
        const company = await shortlisted.findOne({ companyid });
        const SLcandidates = company ? company.candidates : [];

        userdata.forEach((data) => {
            data.skills = [...new Set(data.skills)];
        });
        userdata.sort((a, b) => b.skills.length - a.skills.length);

        const response = userdata.map((elem) => ({
            ...elem.toObject(),
            isshortlisted: SLcandidates.includes(elem._id.toString())
        }));

        // Handle empty results gracefully
        if (userdata.length > 0) {
            res.json({
                data: response,
                totalPages,
                currentPage: parseInt(page, 10),
                total,
            });
        } else {
            res.status(200).json({
                data: [],
                totalPages: 0,
                currentPage: parseInt(page, 10),
                total: 0,
            });
        }
    } catch (error) {
        console.error(error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ msg: "Invalid or missing JWT", error });
        }
        res.status(500).json({ msg: "Internal server issue", error });
    }
};


const shortlistCandidate = async (req, res) => {
    try {
        const { id, action } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "No token provided", success: false });
        }
        const jwtToken = authHeader.split(" ")[1];
        console.log(jwtToken)
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const companyid = decoded._id;
        let employeer = await shortlisted.findOne({ companyid });
        if (!employeer) {
            employeer = new shortlisted({
                companyid: companyid,
                candidates: []
            });
        }
        if (action === "shortlist") {
            if (!employeer.candidates.includes(id)) {
                employeer.candidates.push(id);
            }
        } else if (action === "reject") {
            if (employeer.candidates.includes(id)) {
                employeer.candidates = employeer.candidates.filter((ele) => ele != id);
            }
        } else {
            return res.status(400).json({ msg: "Invalid action", success: false });
        }
        await employeer.save();
        const message = action === "shortlist" ? "Candidate successfully shortlisted" : "Candidate successfully rejected";
        res.status(201).json({ msg: message, success: true, updatedCandidates: employeer.candidates });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Failed", success: false });
    }
};

module.exports = {
    loginJS,
    signupJS,
    loginE,
    signupE,
    PostJob,
    sendJSdata,
    getUserProfile,
    shortlistCandidate,
    searchcandidates
}
