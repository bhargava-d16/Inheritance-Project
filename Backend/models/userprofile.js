const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const Userprofile=new Schema({
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
        type:String,
    },
    currentlyworking:{
        type:String,
    }
})


const UserProfile=mongoose.model('userProfile',Userprofile);
module.exports = { UserProfile };