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
const reachouts = require("../models/reachoutSchmea");
// const shortlisted = require("../models/shortlist");




const loginJS = async (req, res) => {
    try {
        const { username, password } = await req.body;
        const u = await UserModel.findOne({ username });
        if (!u) {
            return res.status(403).json({ msg: "Invalid Credentials Or User Does't Exist", success: false })
        }
        const x = await bcrypt.compare(password, u.password)
        if (x) {
            const jwtToken = jwt.sign({ username: u.username, _id: u._id, user: 'Candidate' },
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        await user.save();
        const jwtToken = jwt.sign({ username: user.username, _id: user._id, user: 'Candidate' },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        const newuser = new UserProfile({
            username,
            email: email,
        });
        await newuser.save();
        console.log("Yaha tuk hua hia 1")
        res.status(201).json({ msg: "SignUp Success!", success: true, jwtToken, username });
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
            const jwtToken = jwt.sign({ username: u.username, _id: u._id, user: 'Company' },
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

        const jwtToken = jwt.sign({ username: employer.username, _id: employer._id, user: 'Company' },
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
            experience: details.experience,
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
            (elem.name) && elem.name.toLowerCase().includes(search.toLowerCase()) ||
            elem.skills && elem.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
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
        const SLcandidates = company ? company.candidates.map(elem=>elem.candidateId) : [];

        userdata.forEach((data) => {
            data.skills = [...new Set(data.skills)];
        });
        userdata.sort((a, b) => b.skills.length - a.skills.length);

        const response = userdata.map((elem) => ({
            ...elem.toObject(),
            isshortlisted: SLcandidates.includes(elem._id.toString())
        }));

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
        const { username, id, action } = req.body;
        console.log("Request Data:", { username, id, action });
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "No token provided", success: false });
        }
        const jwtToken = authHeader.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const company = decoded.username; 
        const candidate = await UserModel.findOne({ username });
        const job=await JobsModel.findOne({_id:id});
        console.log(job);
        if (!candidate) {
            return res.status(404).json({ msg: "Candidate not found", success: false });
        }
        let employer = await shortlisted.findOne({ jobid: id });
        if (!employer) {
            employer = new shortlisted({
                companyid: company,
                jobid: id,
                candidates: [],
            });
        }
        if (action === "shortlist") {
            if (!employer.candidates.some((x) => x.username === username)) {
                employer.candidates.push({ username });
            } else {
                return res.status(400).json({ msg: "Candidate already shortlisted", success: false });
            }
        } else if (action === "reject") {
            employer.candidates = employer.candidates.filter((c) => c.username !== username);
            job.appliedCandidatesID=job.appliedCandidatesID.filter((x)=>x!==username);

        } else {
            return res.status(400).json({ msg: "Invalid action", success: false });
        }
        await employer.save();
        await job.save();
        console.log(job.appliedCandidatesID);

        const message =
            action === "shortlist"
                ? "Candidate successfully shortlisted"
                : "Candidate successfully rejected";
        res.status(201).json({ msg: message, success: true, updatedCandidates: employer.candidates });
    } catch (error) {
        console.error("Error in shortlistCandidate:", error);
        res.status(500).json({ msg: "Server error", success: false });
    }
};

const reachoutcandidates = async (req, res) => {
  try {
    const { username } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided", success: false });
    }
    const jwtToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const company = decoded.username; 
    let candidate = await reachouts.findOne({ username: username });
    if (!candidate) {
      candidate = new reachouts({ username: username, company: [] });
    }
    if (!candidate.company.includes(company)) {
      candidate.company.push(company);
      await candidate.save();
      return res.status(200).json({ msg: "Company added successfully", success: true });
    } else {
      return res.status(200).json({ msg: "Company already exists", success: false });
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Invalid token", success: false });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: "Token expired", success: false });
    }
    res.status(500).json({ msg: "Failed", success: false });
  }
};

const sendjobposts = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "No token provided", success: false });
        }
        const jwtToken = authHeader.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
        const username = decoded.username;
        const companyjobs = await JobsModel.find({ companyusername: username });
        if (companyjobs) res.json({ jobs: companyjobs });
        else res.json({ jobs: [] })
    } catch (error) {
        console.log(error);
    }
}

const sendjobdata = async (req, res) => {
    const { id } = req.params;
    const job = await JobsModel.findById(id)
    const appliedusernames = (job.appliedCandidatesID || []);
    console.log(appliedusernames)
    const candidates = await UserProfile.find({ username: { $in: appliedusernames } })
    console.log("candidates",candidates)
    const short=await shortlisted.findOne({jobid:id});
    console.log("kjadf",short.candidates&&short.candidates || [])
    res.json({ candidates: candidates,shortlistedcandidates:short.candidates, msg: "Candidates data recieved successfully!" });
}

// const sendjobdata = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const job = await JobsModel.findById(id);
//       const appliedusernames = job.appliedCandidatesID || [];
//       console.log("Applied Usernames:", appliedusernames);
  
//       // Log all usernames in the UserProfile collection for comparison
//       const allUsernames = await UserProfile.find({}, { username: 1, _id: 0 });
//       console.log("All Usernames in DB:", allUsernames);
  
//       const candidates = await UserProfile.find({ username: { $in: appliedusernames } });
//       console.log("Matched Candidates:", candidates);
  
//       // Fetch shortlisted candidates
//       const short = await shortlisted.findOne({ jobid: id });
//       console.log("Shortlisted Candidates:", short?.candidates || []);
  
//       res.json({
//         candidates: candidates,
//         shortlistedcandidates: short?.candidates || [],
//         msg: "Candidates data received successfully!",
//       });
//     } catch (error) {
//       console.error("Error in sendjobdata:", error);
//       res.status(500).json({ msg: "An error occurred", error: error.message });
//     }
//   };
  
const JobApply = async (req, res) => {
    try {
        const { jobid } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "No token provided", success: false });
        }
        const jwtToken = authHeader.split(' ')[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const id = decoded._id;
        const job = await JobsModel.findById(jobid);
        if (!job) {
            return res.status(404).json({ msg: "Job not found", success: false });
        }
        console.log(job);
        if (job.appliedCandidatesID.includes(id)) {
            return res
                .status(400)
                .json({ msg: "You have already applied for this job", success: false });
        }
        job.appliedCandidatesID.push(id);
        await job.save();
        return res
            .status(200)
            .json({ msg: "Successfully applied for the job", success: true });
    } catch (error) {
        return res
            .status(500)
            .json({ msg: "Internal Server Issues", success: false });
    }
}
module.exports = {
    loginJS,
    signupJS,
    loginE,
    signupE,
    PostJob,
    sendJSdata,
    getUserProfile,
    shortlistCandidate,
    searchcandidates,
    sendjobposts,
    sendjobdata,
    JobApply,
    reachoutcandidates
}
