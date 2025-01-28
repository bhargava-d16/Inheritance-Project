const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    createdAt : {
        type :Date,
        deafult:Date.now
    }
})

const ESchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    createdAt : {
        type :Date,
        deafult:Date.now
    }
})

const UserModel=mongoose.model('users',UserSchema);
const EModel=mongoose.model('employeers',ESchema);
module.exports = { UserModel, EModel };