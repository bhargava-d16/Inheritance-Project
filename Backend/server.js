require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const requireAuth = require("./middlewares/requireauth");
const { connectDB, createUser } = require("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

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
  origin:["http://localhost:5173 ","http://localhost:4173"],
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

app.post("/api/EDashboard/myjobs/:id", shortlistCandidate);
app.get("/api/EDashboard/myjobs/:id", sendjobdata);
app.get("/api/EDashboard/myjobs", sendjobposts);
app.get("/api/EDashboard/search", searchcandidates);
app.post("/api/EDashboard", reachoutcandidates);
app.get("/api/EDashboard", sendJSdata);
app.post("/api/EDashboard/jobposting", PostJob);
app.get("/api/user/:username", getUserProfile);
app.put("/api/user/:username", saveUserProfile);
app.get("/api/company/:username", getCompanyProfile);
app.put("/api/company/:username", saveCompanyProfile);
app.get("/api/jobs", getJobs);
app.get("/api/jobs/:jobid", getCompanyDetails);
app.put("/api/jobs/:companyusername", putJobApplication);
app.get("/api/user",getUser);
app.post("/api/register/user", registeruser) 
app.post("/api/login/company", loginemp)
app.post("/api/login/user" ,loginuser) 
app.post("/api/register/company", registeremp)  
app.put('/api/user',markasReadfunc)                    
app.get("/api/userassets/:username", getUserAssets);
app.post(
  "/api/saveprofilepic/:username",
  upload.single("profilepic"),
  saveNewProfilePic
);
app.post(
  "/api/savecompanypic/:username",
  upload.single("companypic"),
  saveNewCompanyPic
);
app.post('/api/EDashboard/myjobs/:id/sendinvite',sendinvite)
app.get("/api/scheduled-meets/:username", scheduledmeets);

app.get('/api/user/main/:username',getsavedjob)
app.post('/api/user/jobs',savedJobs)

app.post('/api/user/unsave',unsavejob)






app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
