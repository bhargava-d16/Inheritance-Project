const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ShortlistSchema=new Schema({
    companyid:{
        type:mongoose.Schema.Types.ObjectId,ref:"companyid",
        required: [true, "Company id is required.."]
        
    },
    candidates:[{
        type:mongoose.Schema.Types.ObjectId,ref:"Candidateid"
    }]
});
const shortlisted=mongoose.model('shortlistedcandidates',ShortlistSchema);

module.exports=shortlisted;