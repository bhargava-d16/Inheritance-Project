const JobCard = ({ job, onApply }) => {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
            <p className="text-gray-600 mt-1">{job.company}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="text-gray-600">{job.location}</span>
              <span className="text-gray-600">{job.salary}</span>
              <span className="text-gray-600">{job.experience}</span>
            </div>
          </div>
          <button 
            onClick={() => onApply(job.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Apply Now
          </button>
        </div>
      </div>
    );
  };
  
  export default JobCard;