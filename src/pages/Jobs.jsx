import React, { useState } from 'react';

const Jobs = () => {
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Bangalore",
      salary: "₹25,000/month",
      type: "Full-time",
      experience: "0-2 years",
      deadline: "30 Jan 2025",
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "StartupX",
      location: "Remote",
      salary: "₹15,000/month",
      type: "Internship",
      experience: "Fresher",
      deadline: "25 Jan 2025",
    }
  ]);

  return (
    <div className="relative">
        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="max-w-6xl mx-auto p-4">
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

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white shadow rounded-lg p-6">
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

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>

    </div>
    
  );
};

export default Jobs;