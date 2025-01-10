const Joi=require('joi')

const signupValidation=(req,res,next)=>{
    const schema=Joi.object({
        username:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({error})
    }
    next();
}

const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        username:Joi.string().required(),
        password:Joi.string().min(4).max(100).required()
    })
    const {err}=schema.validate(req.body);
    if(err){
        return res.status(400).json({msg:"Bad Req",err})
    }
    next();
}

// const AuthenticateUser=(req,res,next)=>{
//     const token = req.header('Authorization')?.split(' ')[1]; 
//     console.log(token);
//     next();

// }

module.exports={
    loginValidation,
    signupValidation
}