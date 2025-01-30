const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    username: { type: String , required: true,default:""},
    companyName: { type: String,default:""},
    industry: { type: String,default:""},
    description: { type: String,default:"" },
    website: { type: String ,default:""},
    email: { type: String, required: true, unique: true,default:"" },
    phone: { type: String,default:"" },
    location: { type: String ,default:""},
    foundedYear: { type: Number,default:"" },
    revenue: { type: String,default:"" },
    linkedin: { type: String ,default:""},
    services: { type: String,default:"" },
    technologies: { type: String,default:"" },
    companypicurl: { type: String ,default:""}
  }
);

const CompanyProfile= mongoose.model("CompanyProfile", companySchema);
module.exports = CompanyProfile