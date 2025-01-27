// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Username is required"],
//     trim: true
//   },
//   jobprofile: {
//     type: String,
//     required: [true, "Job profile is required"],
//     trim: true
//   },
//   company: {
//     type: String,
//     required: [true, "Company name is required"],
//     trim: true
//   },
//   location: {
//     type: String,
//     required: [true, "Location is required"],
//     trim: true
//   },
//   salary: {
//     type: Number,
//     required: [true, "Salary is required"]
//   },
//   type: {
//     type: String,
//     required: [true, "Job type is required"]
//     // enum: {
//     //   values: ['Full-time', 'Part-time', 'Internship', 'Contract'],
//     //   message: "{VALUE} is not a valid job type"
//     // }
//   },
//   description: {
//     type: String,
//     required: [true, "Job description is required"]
//   },
//   requirements: {
//     type: String,
//     default: "No specific requirements provided"
//   },
//   deadline: {
//     type: Date,
//     required: [true, "Application deadline is required"]
//   },
//   openings: {
//     type: Number,
//     default: 1 
//   }
// }, 
// {
//   timestamps: true 
// });

// const JobsModel = mongoose.model('Jobs', jobSchema);
// module.exports = JobsModel;


const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobprofile: {
    type: String,
    required: [true, "Job profile is required"],
    trim: true
  },
  companyusername: {
    type: String,
    required: [true, "Company username is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"]
  },
  type: {
    type: String,
    required: [true, "Job type is required"]

  },
  experience: {
    type: String,
    required: [true, "Experience is required"]
  },
  description: {
    type: String,
    required: [true, "Job description is required"]
  },
  requirements: {
    type: String,
    default: "No specific requirements provided"
  },
  deadline: {
    type: Date,
    required: [true, "Application deadline is required"]
  },
  openings: {
    type: Number,
    default: 1 
  },
  appliedCandidatesID:{
    type:Array,
    default:[]
  }
}, 
{
  timestamps: true 
});

const JobsModel = mongoose.model('Jobs', jobSchema);
module.exports = JobsModel;