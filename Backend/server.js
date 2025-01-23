
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const { connectDB, createUser } = require("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const { loginValidation, signupValidation } = require("./middlewares/Validation");
const { loginJS, signupJS, loginE, signupE, getUserProfile,sendJSdata,PostJob,shortlistCandidate,searchcandidates,sendjobposts,sendjobdata,reachoutcandidates } = require("./controllers/Logic");

app.use(bodyParser.json());
app.use(cors());

const startServer = async () => {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await connectDB();
        console.log("✅ MongoDB Connected!");
        
    }catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1); 
    }
    
} 
startServer();

app.post('/EDashboard/myjobs/:id',shortlistCandidate)
app.get('/EDashboard/myjobs/:id',sendjobdata);
app.get('/EDashboard/myjobs',sendjobposts)
app.get('/EDashboard/search',searchcandidates);
app.post('/EDashboard',reachoutcandidates);
app.get('/EDashboard',sendJSdata);
app.post('/EDashboard/jobposting',PostJob);
app.post("/login/employeer", loginValidation, loginE);
app.post("/signup/employeer", signupValidation, signupE);
app.post("/login/jobseeker", loginValidation, loginJS);
app.post("/signup/jobseeker", signupValidation, signupJS);
app.get("/user/:username", getUserProfile);
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
