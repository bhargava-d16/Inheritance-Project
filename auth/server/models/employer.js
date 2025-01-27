const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const EmpSchema=new Schema({
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
    }
})

const EmpModel=mongoose.model('employeers',EmpSchema);
module.exports = EmpModel;