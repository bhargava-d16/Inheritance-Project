const mongoose= require('mongoose');

const UserInteractionSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
    },
    savedJobs : [{
        jobId: {
            type:String,
            required:true
        },
        jobProfile: String,
        company: String,
        savedDate:{
            type: DataTransfer,
            default: Date.now
        }
    }],
    appliedJobs: [{
        jobId: {
            type: String,
            required: true
          },
          jobProfile: String,
          company: String,
          appliedDate: {
            type: Date,
            default: Date.now
          }
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('UserJobInteraction', UserJobInteractionSchema);