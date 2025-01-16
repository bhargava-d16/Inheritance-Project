const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    username: { type: String , required: true},
    companyName: { type: String},
    industry: { type: String},
    description: { type: String },
    website: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    location: { type: String },
    foundedYear: { type: Number },
    revenue: { type: String },
    linkedin: { type: String },
    services: { type: String },
    technologies: { type: String }
  }
);

module.exports = mongoose.model("CompanyProfile",companySchema);