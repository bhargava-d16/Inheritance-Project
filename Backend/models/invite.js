const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
    username: String,
    date: String,
    time: String,
    link: String,
    jobId: String
});

const invited=mongoose.model('Invite', InviteSchema);
module.exports=invited;