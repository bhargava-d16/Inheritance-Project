const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Userassets =new Schema({
    username:{
        type:String,
        default:""

    },

    profilepicurl:{
        type:String,
        default:""

    },
    savedjobs:{
        type:Array,
        default:[]

    }
});
const UserAssets=mongoose.model('userassets',Userassets);

module.exports=UserAssets;