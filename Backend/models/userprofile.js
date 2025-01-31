const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userprofile = new Schema({
  username: {
    type: String,
    default:""

  },
  name: {
    type: String,
    default:""
    // required: true,
  },
  place: {
    type: String,
    default:""

  },
  email: {
    type: String,
    default:""

  },
  phone: {
    type: String,
    default:""

  },
  education: {
    type: String,
    default:""

  },
  workexperices: {
    type: String,
    default:""

  },
  extracirrucular: {
    type: String,
    default:""

  },
  academics: {
    type: String,
    default:""

  },
  skills: {
    type: Array,
    default:""

  },
  currentlyworking: {
    type: String,
    default:""

  },
  opentooffers: {
    type: String,
    default: "yes",
  },
  DOB: {
    type: Date,
    default:""
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
//
