const Employers = require('../models/employer');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt=require('jsonwebtoken')

const loginuser=async (req,res,next)=>{
    const{email,password}=req.body;
    try{
        const formattedEmail=email.toLowerCase()


        const existingEmployer = await Employers.findOne({ email: formattedEmail });
        if (!existingEmployer) {
            return res.status(400).json({ message: "This user does not exist" });
        }

        const isPassmatch= await bcrypt.compare(password,existingEmployer.password);
        if(!isPassmatch){
            return res.status(400).json({ message: "Incorrect password " });
        }
        const accessToken = jwt.sign(
            {
                email: formattedEmail,
                empId: existingEmployer._id,
            },
            process.env.JWT_SECRET, // Add a secret key here
            { expiresIn: "7d" } 
        );
        
        res.status(200).json({ message: 'Login successfull',status:true,token:accessToken});
   
    }
    catch(error){
          next(error)
    }
}

module.exports=loginuser;
