const { UserModel } = require("../models/user");
const { EModel } = require("../models/user")
const UserProfile = require("../models/userprofile")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobsModel = require("../models/Jobs");
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const shortlisted = require("../models/shortlist");




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
        const jwtToken = jwt.sign({ username: employer.username, _id: employer._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        res.status(201).json({ msg: "SignUp Success!", success: true, jwtToken });
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


// const sendJSdata = async (req, res) => {
//     try {
//         const { filter, page = 1 } = req.query;  // Default page is 1
//         const authHeader = req.headers.authorization;

//         // JWT validation
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ msg: "JWT must be provided", success: false });
//         }

//         const jwtToken = authHeader.split(" ")[1];
//         const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
//         const companyid = decoded._id;

//         let userdata;
//         if (filter === "all" || !filter) {
//             userdata = await UserProfile.find();
//         } else if (filter === "notworking") {
//             userdata = await UserProfile.find({ currentlyworking: "" });
//         } else if (filter === "opentooffers") {
//             userdata = await UserProfile.find({ opentooffers: true });
//         }

//         const company = await shortlisted.findOne({ companyid });
//         const SLcandidates = company ? company.candidates : [];
//         userdata.forEach((data) => {
//             data.skills = [...new Set(data.skills)];
//         });
//         userdata.sort((a, b) => b.skills.length - a.skills.length);

//         // Pagination logic
//         const usersPerPage = 10; // Show 10 users per page
//         const totalUsers = userdata.length;
//         const totalPages = Math.ceil(totalUsers / usersPerPage); // Total pages calculation

//         // Calculate pagination offsets
//         const startIndex = (page - 1) * usersPerPage;
//         const endIndex = page * usersPerPage;

//         const paginatedUsers = userdata.slice(startIndex, endIndex); // Slice users for current page

//         // Send paginated data along with pagination info
//         const response = paginatedUsers.map((elem) => ({
//             ...elem.toObject(),
//             isshortlisted: SLcandidates.includes(elem._id.toString()) ? true : false,
//         }));

//         res.json({
//             data: response,
//             totalPages, // Total number of pages
//             currentPage: page,
//             totalUsers, // Total number of users
//         });

//     } catch (error) {
//         console.error(error);
//         if (error.name === "JsonWebTokenError") {
//             return res.status(401).json({ msg: "Invalid or missing JWT", error });
//         }
//         res.status(500).json({ msg: "Internal server issue", error });
//     }
// };

const sendJSdata = async (req, res) => {
    try {
        const { filter, search, page = 1, limit = 10 } = req.query; // Default page = 1, limit = 10
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "JWT must be provided", success: false });
        }

        const jwtToken = authHeader.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const companyid = decoded._id;

        // Build search criteria
        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },  // Case-insensitive search
                    { skills: { $elemMatch: { $regex: search, $options: 'i' } } }
                ],
            };
        }

        // Filtering based on the category
        let filterCriteria = {};
        if (filter === "notworking") {
            filterCriteria.currentlyworking = "";
        } else if (filter === "opentooffers") {
            filterCriteria.opentooffers = true;
        }

        // Query the database with filters and search
        const userdata = await UserProfile.find({
            ...filterCriteria,
            ...searchCriteria
        })
        .skip((page - 1) * limit)
        .limit(limit);

        const total = await UserProfile.countDocuments({
            ...filterCriteria,
            ...searchCriteria
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
    shortlistCandidate
}
