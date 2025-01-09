const express=require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 8080;
require("./models/db");
const bodyParser=require('body-parser');
const cors=require('cors');
const { loginValidation, signupValidation } = require('./middlewares/Validation');
const { loginJS, signupJS,loginE,signupE, sendJSdata } = require('./controllers/Logic');


app.use(bodyParser.json());
app.use(cors());

app.get('/EDashboard',sendJSdata)

app.post('/login/employeer',loginValidation,loginE)
app.post('/signup/employeer',signupValidation,signupE)
app.post('/login/jobseeker',loginValidation,loginJS)
app.post('/signup/jobseeker',signupValidation,signupJS)

app.listen(PORT,()=>{
    console.log(`Server is working! on the port ${PORT}`)
})