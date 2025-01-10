const {UserModel} = require("../models/user");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {EModel}=require("../models/user"); 
const JobsModel = require("../models/Jobs");


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

const em= [
    { id: 1, companyName: 'Company 1', description: 'Tech company' },
    { id: 2, companyName: 'Company 2', description: 'Design company' },

  ];
const sendJSdata=async(req,res)=>{
    res.json(em);

}

const PostJob=async(req,res)=>{
    try {
        const details=await req.body;
        const job=new JobsModel({
            jobprofile:details.jobprofile,
            company:'Oracle',
            location:details.location,
            salary:details.salary,
            type:details.type,
            description:details.desc,
            requirements:details.requirements,
            deadline:details.deadline,
            openings:details.openings,
            createdAt:new Date(),
        })
        await job.save();
        res.status(201).json({ msg: "Job posting Success!", success: true });
    } catch (error) {
        res.status(500).json({ msg: "Internal server issue", error })
    }
}




module.exports = {
    loginJS,
    signupJS,
    loginE,
    signupE,
    sendJSdata,
    PostJob
}


// jobprofile: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   company: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   location: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   salary: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     required: true,
//     enum: ['Full-time', 'Part-time', 'Internship', 'Contract']
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   requirements:{
//     type: String
//   },
//   deadline: {
//     type: Date,
//     required: true
//   },
//   openings: {
//     type: Number,
//     default: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
