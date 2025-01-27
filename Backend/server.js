
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const requireAuth = require("./middlewares/requireauth");
const { connectDB, createUser } = require("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");



// const { loginValidation, signupValidation } = require("./middlewares/Validation");
const {  getUserProfile,sendJSdata,PostJob,getJobs,getCompanyDetails,putJobApplication,getUser} = require("./controllers/Logic");

const registeruser = require("./controllers/registeruser");
const registeremp = require("./controllers/registeremp");
const loginuser = require("./controllers/loginuser");
const loginemp = require("./controllers/loginemp");


app.use(bodyParser.json());
app.use(cors());

app.use((error, req, res, next) => {
    const message = error.message ;
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: message, hello: "world" });
});


const startServer = async () => { 
    try {
        console.log("⏳ Connecting to MongoDB...");
        await connectDB();
        console.log("✅ MongoDB Connected!");
        
    }catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1); // Exit if there's an error
    }
    
} 
startServer();
// Call the function to start the server

app.get('/EDashboard',sendJSdata)
app.post('/EDashboard/jobposting',PostJob)
app.get("/user/:username", getUserProfile);
app.get("/jobs", getJobs);
app.get("/jobs/:companyusername", getCompanyDetails);
app.put("/jobs/:companyusername", putJobApplication);
app.get("/user",getUser);
app.post("/register/user", registeruser) 
app.post("/login/company", loginemp)
app.post("/login/user" ,loginuser) 
app.post("/register/company", registeremp)                      


// Start server only after DB connection
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});



// createJob();