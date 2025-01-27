const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortlistSchema = new Schema({
  companyid: {
    type:String,
    ref: "Company",
    required: [true, "Company id is required."]
  },
  jobid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: false
  },
  candidates: [
    {
      username: {
        type: String,
        required: true
      }
    }
  ]
});

const shortlisted = mongoose.model('shortlistedcandidates', ShortlistSchema);

module.exports = shortlisted;