import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';

const Jobs = ({ jobs, loading }) => {
  const navigate = useNavigate();

  const handleApply = (jobId) => {
    navigate(`/user/jobs/${jobId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && jobs.length === 0) {
    return <div className="text-center">No jobs found. Please check back later.</div>;
  }
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="max-w-6xl mx-auto p-4">
          {/* Search Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search jobs..."
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Location..."
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                Search
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={handleApply} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;