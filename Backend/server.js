// const express=require('express');
// const app=express();
// require('dotenv').config();
// const PORT=process.env.PORT || 8080;
// const {connectDB , createUser } =  require ("./models/db");
// const bodyParser=require('body-parser');
// const cors=require('cors');
// const { loginValidation, signupValidation } = require('./middlewares/Validation');
// const { loginJS, signupJS,loginE,signupE , getUserProfile } = require('./controllers/Logic');



//  connectDB()

//   createUser()




// app.use(bodyParser.json());
// app.use(cors());

// // app.get('/EDashboard',sendJSdata)

// app.post('/login/employeer',loginValidation,loginE)
// app.post('/signup/employeer',signupValidation,signupE)
// app.post('/login/jobseeker',loginValidation,loginJS)
// app.post('/signup/jobseeker',signupValidation,signupJS)
// app.get('/user/:username' , getUserProfile )

// app.listen(PORT,()=>{
//     console.log(`Server is working fine! on the port ${PORT}`)
// })



/////////////////////////////////////////////////////////



require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const { connectDB, createUser } = require("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const { loginValidation, signupValidation } = require("./middlewares/Validation");
const { loginJS, signupJS, loginE, signupE, getUserProfile } = require("./controllers/Logic");

app.use(bodyParser.json());
app.use(cors());

const startServer = async () => {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await connectDB();
        console.log("✅ MongoDB Connected!");

        console.log("📌 Creating Test User...");
        await createUser();
        console.log("✅ User Created!");

        // Routes
    }catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1); // Exit if there's an error
    }
    
} 
startServer();
// Call the function to start the server
app.post("/login/employeer", loginValidation, loginE);
app.post("/signup/employeer", signupValidation, signupE);
app.post("/login/jobseeker", loginValidation, loginJS);
app.post("/signup/jobseeker", signupValidation, signupJS);
app.get("/user/:username", getUserProfile);

// Start server only after DB connection
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
