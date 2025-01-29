const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userprofile = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  place: {
    type: String,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
  },
  education: {
    type: String,
  },
  workexperices: {
    type: String,
  },
  extracirrucular: {
    type: String,
  },
  academics: {
    type: String,
  },
  skills: {
    type: Array,
  },
  currentlyworking: {
    type: String,
  },
  opentooffers: {
    type: String,
    default: "yes",
  },
  DOB: {
    type: Date,
  },
  notifications: [
    {
      type: {
        type: String, 
        // required: true,
      },
      message: {
        type: String,
        // required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const UserProfile = mongoose.model("userProfile", Userprofile);
module.exports = UserProfile;
