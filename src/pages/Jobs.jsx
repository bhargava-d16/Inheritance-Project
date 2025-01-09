import React, { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, ExternalLink } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Location..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
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
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-400" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-gray-400" />
                    <span>{job.experience}</span>
                  </div>
                </div>
              </div>
              
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Apply Now
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;