const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobprofile: {
    type: String,
    required: [true, "Job profile is required"],
    trim: true
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },
  salary: {
    type: String,
    required: [true, "Salary is required"]
  },
  type: {
    type: String,
    required: [true, "Job type is required"]
    // enum: {
    //   values: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    //   message: "{VALUE} is not a valid job type"
    // }
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
  }
}, 
{
  timestamps: true 
});

const JobsModel = mongoose.model('Jobs', jobSchema);
module.exports = JobsModel;
