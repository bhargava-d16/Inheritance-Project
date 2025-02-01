require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const requireAuth = require("./middlewares/requireauth");
const { connectDB, createUser } = require("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const __dirname= path.resolve();

const {
  searchcandidates,
  shortlistCandidate,
  sendjobposts,
  sendjobdata,
  reachoutcandidates,
  getUserProfile,
  sendJSdata,
  PostJob,
  getJobs,
  getCompanyDetails,
  putJobApplication,
  getUser,
  saveUserProfile,
  getCompanyProfile,
  saveCompanyProfile,
  getUserAssets,
  saveNewProfilePic,
  saveNewCompanyPic,
  markasReadfunc,
  scheduledmeets,
  sendinvite,
  savedJobs,
  getsavedjob,
  unsavejob
} = require("./controllers/Logic");

const registeruser = require("./controllers/registeruser");
const registeremp = require("./controllers/registeremp");
const loginuser = require("./controllers/loginuser");
const loginemp = require("./controllers/loginemp");

app.use(bodyParser.json());
app.use(cors({
  origin:["http://localhost:5173 ","http://localhost:4173","https://inheritance-project-spsr.vercel.app/"],
  credentials:true,
}));
const { upload } = require("./middlewares/multer");
app.use((error, req, res, next) => {
  const message = error.message;
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: message, hello: "world" });
});

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../Frontend/dist")))

  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
  })
}

const startServer = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};
startServer();

app.post("/EDashboard/myjobs/:id", shortlistCandidate);
app.get("/EDashboard/myjobs/:id", sendjobdata);
app.get("/EDashboard/myjobs", sendjobposts);
app.get("/EDashboard/search", searchcandidates);
app.post("/EDashboard", reachoutcandidates);
app.get("/EDashboard", sendJSdata);
app.post("/EDashboard/jobposting", PostJob);
app.get("/user/:username", getUserProfile);
app.put("/user/:username", saveUserProfile);
app.get("/company/:username", getCompanyProfile);
app.put("/company/:username", saveCompanyProfile);
app.get("/jobs", getJobs);
app.get("/jobs/:jobid", getCompanyDetails);
app.put("/jobs/:companyusername", putJobApplication);
app.get("/user",getUser);
app.post("/register/user", registeruser) 
app.post("/login/company", loginemp)
app.post("/login/user" ,loginuser) 
app.post("/register/company", registeremp)  
app.put('/user',markasReadfunc)                    
app.get("/userassets/:username", getUserAssets);
app.post(
  "/saveprofilepic/:username",
  upload.single("profilepic"),
  saveNewProfilePic
);
app.post(
  "/savecompanypic/:username",
  upload.single("companypic"),
  saveNewCompanyPic
);
app.post('/EDashboard/myjobs/:id/sendinvite',sendinvite)
app.get("/scheduled-meets/:username", scheduledmeets);

app.get('/user/main/:username',getsavedjob)
app.post('/user/jobs',savedJobs)

app.post('/user/unsave',unsavejob)






app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
