const mongoose = require('mongoose');

const ReachOutSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    company: [{
        type: String,
    }]
},
    { timestamps: true }
)

const reachouts = mongoose.model('reachoutcandidates', ReachOutSchema);
module.exports=reachouts;