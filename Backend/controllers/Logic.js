const { UserModel } = require("../models/user");
const { EModel } = require("../models/user")
const UserProfile = require("../models/userprofile")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobsModel = require("../models/jobs");
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const shortlisted = require("../models/shortlist");
const companyprofile = require("../models/companyprofile");
const reachouts = require("../models/reachoutSchema");
const invited = require("../models/invite");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
const UserAssets = require("../models/userassets");
const CompanyProfile = require("../models/companyprofile");
const { uploadImage } = require("../services/cloudinary");



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

const saveUserProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const updateData = req.body; // Data to update from request body

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const updatedUser = await UserProfile.findOneAndUpdate(
      { username: username },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCompanyProfile = async (req, res) => {
  try {
    const username = req.params.username
    const data = await CompanyProfile.findOne({ username: username })
    if (!data) return res.status(404).json({ message: "User not found" });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message, hello: "gand mara madarchod" });
  }


}
const saveCompanyProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const updateData = req.body; // Data to update from request body
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const updatedUser = await CompanyProfile.findOneAndUpdate(
      { username: username },
      { $set: updateData },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



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
const createUserAssets = async (newUserName) => {
  try {
    const newUser = await UserAssets.create({ username: newUserName })
    return newUser;

  } catch (error) {
    console.log("error creating profile", error.message)
  }
}



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
      filterCriteria.opentooffers = { $in: [true, "true", "yes"] };
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
    const SLcandidates = company ? company.candidates.map((elem) => elem.candidateId) : [];
    userdata.forEach((data) => {
      data.skills = [...new Set(data.skills)];
    });
    userdata.sort((a, b) => b.skills.length - a.skills.length);
    const response = userdata.map((elem) => ({
      ...elem.toObject(),
      isshortlisted: SLcandidates.includes(elem._id.toString()),
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

const sendjobdata = async (req, res) => {
  const { id } = req.params;
  const job = await JobsModel.findById(id)
  const appliedusernames = (job.appliedCandidatesID || []);
  const candidates = await UserProfile.find({ username: { $in: appliedusernames } })
  const short = await shortlisted.findOne({ jobid: id });
  let shortcandidates;
  if (short) shortcandidates = short.candidates
  else shortcandidates = []
  res.json({ candidates: candidates, shortlistedcandidates: shortcandidates, msg: "Candidates data recieved successfully!" });
}


const getJobs = async (req, res) => {
  try {
    const jobs = await JobsModel.find();
    if (jobs.length > 0) {
      res.json(jobs);
    } else {
      res.status(404).send({ msg: "Jobs not found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server issue", error });
  }
};

const shortlistCandidate = async (req, res) => {
  try {
    const { username, id, action } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided", success: false });
    }
    const jwtToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const company = decoded.username;
    const candidate = await UserProfile.findOne({ username: username });
    const job = await JobsModel.findOne({ _id: id });
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
    let notification = {}
    if (action === "shortlist") {
      if (!employer.candidates.some((x) => x.username === username)) {
        employer.candidates.push({ username });
        notification = {
          type: "shortlisted",
          message: `You have been shortlisted by ${company}.`,
          timestamp: new Date(),
          isRead: false,
        };

      } else {
        return res.status(400).json({ msg: "Candidate already shortlisted", success: false });
      }
    } else if (action === "reject") {
      employer.candidates = employer.candidates.filter((c) => c.username !== username);
      job.appliedCandidatesID = job.appliedCandidatesID.filter((x) => x !== username);
      notification = {
        type: "rejected",
        message: `You have been rejected by ${company}.`,
        timestamp: new Date(),
        isRead: false,
      };
    } else {
      return res.status(400).json({ msg: "Invalid action", success: false });
    }
    candidate.notifications.push(notification)
    await candidate.save();
    await employer.save();
    await job.save();
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
    let notification;
    let user = await UserProfile.findOne({ username: username });
    notification = {
      type: "reach out",
      message: `You have been reached by ${company}.`,
      timestamp: new Date(),
      isRead: false,
    };
    user.notifications.push(notification);
    let candidate = await reachouts.findOne({ username: username });
    if (!candidate) {
      candidate = new reachouts({ username: username, company: [] });
    }
    if (!candidate.company.includes(company)) {
      candidate.company.push(company);
      await user.save();
      await candidate.save();
      return res.status(200).json({ msg: "Company added successfully", success: true });
    } else {
      return res.status(200).json({ msg: "Company already exists", success: false });
    }
  } catch (error) {
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
const getCompanyDetails = async (req, res) => {
  try {
    const jobid = req.params.jobid;
    const job = await JobsModel.findById(jobid);
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server issue", error });
  }
}

const putJobApplication = async (req, res) => {
  try {
    const newJobDetail = req.body;
    await JobsModel.findByIdAndUpdate(newJobDetail._id, newJobDetail, { new: true });
    res.status(201).json({ msg: "Job Application submitted successfully!", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server issue ", error });
  }
}


const getUser = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserProfile.findOne({ username: decoded.name })
    user.notifications = user.notifications && user.notifications.sort((a, b) => {
      if (a.isRead == b.isRead) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a.isRead ? 1 : -1;
    });
    await user.save();
    res.status(200).json({ message: 'User verified', username: decoded.name, notifications: user.notifications });
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please login again' });
    }

    res.status(500).json({ msg: "Internal server issue", error });
  }
};
const getUserAssets = async (req, res) => {
  try {
    const username = req.params.username
    const data = await UserAssets.findOne({ username: username })
    if (!data) return res.status(404).json({ message: "User not found" });
    res.json(data);
  }
  catch (error) {

    res.status(500).json({ message: error.message });
  }
}

const saveNewProfilePic = async (req, res) => {
  const username = req.params.username;
  try {
    const filePath = req.file.path;
    const folder = "profile_pics";
    const result = await uploadImage(filePath, folder, username);
    await UserAssets.findOneAndUpdate(
      { username: username },
      {
        $set: {
          profilepicurl: result.secure_url,
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).json({
      message: "Image uploaded successfully!",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      message: "Failed to upload image.",
      error: error.message,
    });
  }
}

const saveNewCompanyPic = async (req, res) => {
  const username = req.params.username;
  try {
    const filePath = req.file.path; // Path of the uploaded file on the server
    const folder = "company_pics"; // Cloudinary folder name
    const result = await uploadImage(filePath, folder, username);
    await CompanyProfile.findOneAndUpdate(
      { username: username },
      {
        $set: {
          companypicurl: result.secure_url,
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).json({
      message: "Image uploaded successfully!",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      message: "Failed to upload image.",
      error: error.message,
    });
  }
}


const markasReadfunc = async (req, res) => {
  const { notificationId, username } = req.body;
  try {
    const user = await UserProfile.findOne({ username: username })
    const notification = user.notifications && user.notifications.find(elem => elem._id == notificationId)
    notification.isRead = true;
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed marking as read' });
  }
}

const sendinvite = async (req, res) => {
  try {
    const { cusername, username, date, time, link, jobId } = req.body;
    const newInvite = new invited({ username, date, time, link, jobId });
    await newInvite.save();
    const user = await UserProfile.findOne({ username: username });
    notification = {
      type: "Meeting Invite",
      message: `Your meeting has been scheduled with ${cusername} on ${date} at time ${time}.`,
      timestamp: new Date(),
      isRead: false,
    };
    user.notifications.push(notification);
    await user.save();
    res.status(201).json({ message: "Invite saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save invite" });
  }
};

const scheduledmeets = async (req, res) => {
  try {
    const username = req.params.username;
    const invites = await invited.find({ username });
    if (!invites.length) {
      return res.status(404).json({ message: 'No scheduled meets found' });
    }
    const formattedInvites = invites.map(invite => ({
      username: invite.username,
      date: invite.date,
      time: invite.time,
      link: invite.link,
    }));
    res.json(formattedInvites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scheduled meets', error });
  }
};

const savedJobs = async (req, res) => {
  try {
    const { jobid, username } = req.body;
    const user = await UserAssets.findOne({ username: username });
    const status = user.savedjobs.includes(jobid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (status === false) {
      user.savedjobs.push(jobid);
      await user.save();
    }
    res.status(200).json({ message: "Job saved successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getsavedjob = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserAssets.findOne({ username: username });
    const meets=await invited.find({username:username});
    let interviews;
    if(meets) interviews=meets.length;
    else interviews=0;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const savedJobs = Array.isArray(user.savedjobs) ? user.savedjobs : [];
    const jobs = await JobsModel.find();
    if (savedJobs.length === 0) {
      return res.status(200).json({ message: "No saved jobs found", jobs: jobs, sjobsdetails: [] });
    }
    const sjobids = savedJobs.map(id => new mongoose.Types.ObjectId(id));
    const sjobsdetails = await JobsModel.find({
      '_id': { $in: sjobids }
    });
    res.status(200).json({ sjobsdetails: sjobsdetails, jobs: jobs,interviews:interviews });
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const unsavejob = async (req, res) => {
  try {
    const { jobid, username } = req.body;
    const user = await UserAssets.findOne({ username: username });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const savedJobs = Array.isArray(user.savedjobs) ? user.savedjobs : [];
    const filtered = savedJobs.filter(id => id !== jobid);
    user.savedjobs = filtered;
    await user.save();
    const sjobids = filtered.map(id => new mongoose.Types.ObjectId(id));
    const sjobsdetails = await JobsModel.find({
      '_id': { $in: sjobids }
    });
    res.status(200).json({ success: true, sjobsdetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {

  PostJob,
  sendJSdata,
  getUserProfile,
  saveUserProfile,
  getCompanyProfile,
  saveCompanyProfile,
  getJobs,
  getCompanyDetails,
  putJobApplication,
  getUser,
  shortlistCandidate,
  searchcandidates,
  sendjobposts,
  sendjobdata,
  reachoutcandidates,
  getUserAssets,
  saveNewProfilePic,
  saveNewCompanyPic,
  markasReadfunc,
  scheduledmeets,
  sendinvite,
  savedJobs,
  getsavedjob,
  unsavejob
}
