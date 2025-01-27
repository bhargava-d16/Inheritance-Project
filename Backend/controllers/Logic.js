const { UserModel } = require("../models/user");
const { EModel } = require("../models/user")
const UserProfile = require("../models/userprofile")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobsModel = require("../models/jobs");

const mongoose = require('mongoose');

// const loginJS = async (req, res) => {
//     try {
//         const { username, password } = await req.body;
//         const u = await UserModel.findOne({ username });
//         if (!u) {
//             return res.status(403).json({ msg: "Invalid Credentials Or User Does't Exist", success: false })
//         }
//         const x = await bcrypt.compare(password, u.password)
//         if (x) {
//             const jwtToken = jwt.sign({ username: u.username, _id: u._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '24h' }
//             )
//             res.status(201).json({ msg: "Login Success!", success: true, jwtToken, username });

//         }
//         else res.status(403).json({ msg: "Invalid Credentials", success: false })
//     } catch (error) {
//         res.status(500).json({ msg: "Internal server issue", error })
//     }

// }

// const signupJS = async (req, res) => {
//     try {
//         const { username, email, password } = await req.body;
//         const u = await UserModel.findOne({ username });
//         if (u) {
//             return res.status(409).json({ msg: "User Exist", success: false })
//         }
//         const user = new UserModel({
//             username,
//             email,
//             password
//         })
//         user.password = await bcrypt.hash(password, 10);
//         await user.save();
//         res.status(201).json({ msg: "SignUp Success!", success: true });
//     } catch (error) {
//         res.status(500).json({ msg: "Internal server issue", error })
//     }
// }


// const loginE = async (req, res) => {
//     try {
//         const { username, password } = await req.body;
//         const u = await EModel.findOne({ username });
//         if (!u) {
//             return res.status(403).json({ msg: "Invalid Credentials Or User Does't Exist", success: false })
//         }
//         const x = await bcrypt.compare(password, u.password)
//         if (x) {
//             const jwtToken = jwt.sign({ username: u.username, _id: u._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '24h' }
//             )
//             res.status(201).json({ msg: "Login Success!", success: true, jwtToken, username });
//         }
//         else res.status(403).json({ msg: "Invalid Credentials", success: false })
//     } catch (error) {
//         res.status(500).json({ msg: "Internal server issue", error })
//     }

// }

// const signupE = async (req, res) => {
//     try {
//         const { username, email, password } = await req.body;
//         const u = await EModel.findOne({ username });
//         if (u) {
//             return res.status(409).json({ msg: "User Exist", success: false })
//         }
//         const employer = new EModel({
//             username,
//             email,
//             password
//         })
//         employer.password = await bcrypt.hash(password, 10);
//         await employer.save();
//         res.status(201).json({ msg: "SignUp Success!", success: true });
//     } catch (error) {
//         res.status(500).json({ msg: "Internal server issue", error })
//     }
// }

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


const sendJSdata = async (req, res) => {
    try {
        const userdata = await UserProfile.find();

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
        console.error(error);
        res.status(500).json({ msg: "Internal server issue", error });
    }
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
}

const getCompanyDetails = async (req, res) => {
    try {
        const companyusername = req.params.companyusername;
        const job = await JobsModel.find({ companyusername: companyusername });
        res.json(job);
        // res.send("Hello");
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
        const authHeader = req.headers['authorization']; // OR req.get('Authorization')
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or invalid' });
        }
    
        // Extract the token
        const token = authHeader.split(' ')[1]; // Split "Bearer <token>"
    
        // Do something with the token (e.g., verify it)
        console.log('Token received:', token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Access the username from decoded token
        
        
        // Respond with the decoded information (e.g., username)
        res.status(200).json({ message: 'User verified', username: decoded.name });
        
    } catch (error) {
        console.error(error);
        
        // Handle specific errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please login again' });
        }
        
        res.status(500).json({ msg: "Internal server issue", error });
    }
};

const saveJobBookmark = async (req, res) => {
    const { username, jobDetails } = req.body;
    try {
      const update = {
        $addToSet: { 
          savedJobs: {
            jobId: jobDetails.companyusername,
            jobProfile: jobDetails.jobprofile,
            company: jobDetails.company
          }
        }
      };
      
      await UserJobInteraction.findOneAndUpdate(
        { username }, 
        update, 
        { upsert: true, new: true }
      );
      
      res.status(200).json({ message: 'Job bookmarked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to bookmark job' });
    }
  };
  
  const removeJobBookmark = async (req, res) => {
    const { username, jobId } = req.body;
    try {
      await UserJobInteraction.findOneAndUpdate(
        { username },
        { $pull: { savedJobs: { jobId } } }
      );
      res.status(200).json({ message: 'Job removed from bookmarks' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove bookmark' });
    }
  };
  
  const applyToJob = async (req, res) => {
    const { username, jobDetails } = req.body;
    try {
      await UserJobInteraction.findOneAndUpdate(
        { username },
        { 
          $pull: { savedJobs: { jobId: jobDetails.companyusername } },
          $addToSet: { 
            appliedJobs: {
              jobId: jobDetails.companyusername,
              jobProfile: jobDetails.jobprofile,
              company: jobDetails.company
            }
          }
        },
        { upsert: true, new: true }
      );
      
      res.status(200).json({ message: 'Job application submitted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to apply to job' });
    }
  };
  
  const getUserJobInteractions = async (req, res) => {
    const { username } = req.query;
    try {
      const userInteractions = await UserJobInteraction.findOne({ username });
      res.status(200).json({
        savedJobs: userInteractions?.savedJobs || [],
        appliedJobs: userInteractions?.appliedJobs || []
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job interactions' });
    }
  };

module.exports = {

    PostJob,
    sendJSdata,
    getUserProfile,
    getJobs,
    getCompanyDetails,
    putJobApplication,
    getUser,
    saveJobBookmark,
    removeJobBookmark,
    getUserJobInteractions
}
