// const { date, array } = require("joi");
const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const Userprofile=new Schema({
    username:{
        type: String,
    },
    
    name:{
        type:String,
        required:true,
    },
    place:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    education:{
        type:String,
    },
    workexperices:{
        type:String,
    },
    extracirrucular:{
        type:String,
    },
    academics:{
        type:String,
    },
    skills:{
        type:Array,
    },
    currentlyworking:{
        type:String,
    },
    DOB:{
        type: Date
    }
})


const UserProfile=mongoose.model('userProfile',Userprofile);
module.exports = { UserProfile };