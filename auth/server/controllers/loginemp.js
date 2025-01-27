const Users = require('../models/user');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt=require('jsonwebtoken')

const loginemp=async (req,res,next)=>{
    const{email,password}=req.body;
    try{
        const formattedEmail=email.toLowerCase()


        const existingUser = await Users.findOne({ email: formattedEmail });
        if (!existingUser) {
            return res.status(400).json({ message: "This user does not exist" });
        }

        const isPassmatch= await bcrypt.compare(password,existingUser.password);
        if(!isPassmatch){
            return res.status(400).json({ message: "Incorrect password " });
        }
        const accessToken = jwt.sign(
            {
                email: formattedEmail,
                empId: existingUser._id,
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

module.exports=loginemp;