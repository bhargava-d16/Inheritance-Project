


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { 
  User, ChevronLeft, ChevronRight, MapPin, Briefcase, 
  IndianRupee, ExternalLink, Bookmark,
  TrendingUp, Calendar,BookMarked
} from 'lucide-react';

const UserPage = ({ jobs, loading }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedJobs,setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  const username = localStorage.getItem('username').toUpperCase();
  const recentJobs = jobs && jobs.length > 0 ? jobs.slice(0, 10) : [];

  useEffect(() =>{

    if (!localStorage.getItem('jobBookmarks')) {
      localStorage.setItem('jobBookmarks', '[]');
    }
    if (!localStorage.getItem('appliedJobs')) {
      localStorage.setItem('appliedJobs', '[]');
    }
  
    const savedJobUsernames= JSON.parse(localStorage.getItem('jobBookmarks') || '[]');
    const appliedJobUsernames = JSON.parse(localStorage.getItem('appliedJobs') || '[]');

    const savedJobDetails = jobs?.filter(job => savedJobUsernames.includes(job.companyusername))
    || [];

    const savedJobWithDates = savedJobDetails.map(job => ({...job, savedDate: new Date().toISOString().split('T')[0]}));

    setSavedJobs(savedJobWithDates);

   const appliedJobDetails = jobs?.filter(job => appliedJobUsernames.includes(job.companyusername)) || [];
   setAppliedJobs(appliedJobDetails);
  },[jobs]);


  const jobStats = {
    applications: appliedJobs.length,
    interviews: 3,
    saved: savedJobs.length
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recentJobs.length - 3 : prevIndex - 3
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recentJobs.length - 3 ? 0 : prevIndex + 3
    );
  };

  const handleApply = (companyusername) => {
    const appliedJobUsernames = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    if(!appliedJobUsernames.includes(companyusername)){
      appliedJobUsernames.push(companyusername);
      localStorage.setItem('appliedJobs',JSON.stringify(appliedJobUsernames));
      setAppliedJobs((prev) => [...prev,jobs.find(job => job.companyusername === companyusername)] );
    }
    
    navigate(`/user/Jobs/${companyusername}`);
  };


  const handleUnsaveJob =(companyusername) => {
    const bookmarks = JSON.parse(localStorage.getItem('jobBookmarks') || '[]');
    const updatedBookmarks = bookmarks.filter(username => username !== companyusername);
    localStorage.setItem('jobBookmarks', JSON.stringify(updatedBookmarks));

    setSavedJobs(savedJobs.filter(job => job.companyusername !== companyusername));
    toast("Bookmark removed", {
      style: {
        backgroundColor: '#CBDCEB',
        color: '#133E87',
        border: '1px solid #133E87'
      }
    });
  };


  const formatSalary = (salary) => {
    if (!salary) return 'Not Disclosed';
    const inLakhs = salary / 100000;
    return `${inLakhs.toFixed(2)} L/year`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      >
        {/*  Section */}
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center">
              <User size={24} className="text-[#133E87] mr-4"/>
              <div>
                <h1 className="text-2xl font-semibold text-[#133E87]">
                  Welcome {username}
                </h1>
                <p className="text-gray-600">
                  Here are some of the latest job opportunities for you
                </p>
              </div>
            </div>
          </div>
        

        {/* Dashboard Stats */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Applications Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="pb-2">
                <h3 className="text-lg font-medium text-[#133E87]">
                  Applications
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{jobStats.applications}</span>
                <TrendingUp className="text-green-500" size={24}/>
              </div>
            </div>
            
            {/* Interviews Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="pb-2">
                <h3 className="text-lg font-medium text-[#133E87]">
                  Interviews
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{jobStats.interviews}</span>
                <Calendar className="text-[#133E87]" size={24}/>
              </div>
            </div>
            
            {/* Saved Jobs Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="pb-2">
                <h3 className="text-lg font-medium text-[#133E87]">
                  Saved Jobs
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{jobStats.saved}</span>
                <Bookmark className="text-[#133E87]" size={24}/>
              </div>
            </div>
          </div>

          {/* Saved Jobs Section */}
          <div className="bg-white rounded-lg shadow-sm mb-6 ">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium text-[#133E87] flex items-center gap-2">Saved Jobs <BookMarked size={18}/></h3>
            </div>
            <div className="p-4">
              {savedJobs.length === 0 ? (
                <p className='text-gray-500 text-center py-4'>No Saved Jobs Yet</p>
              ) : (
              savedJobs.map(job => (
                <div key={job.companyusername} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <h4 className="font-medium">{job.profile}</h4>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee size={14} />
                          {formatSalary(job.salary)}
                        </span>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Saved on {job.savedDate}</span>
                    <button 
                      className="px-3 py-1 text-sm rounded-md text-white bg-[#133E87] hover:bg-[#608BC1]"
                      onClick={() => handleUnsaveJob(job.companyusername)}
                    >
                      <Bookmark size={16} className='fill-current'/>
                    </button>
                    <button
                     className="px-3 py-1 text-sm rounded-md text-white bg-[#133E87] hover:bg-[#608BC1]"
                     onClick={() => handleApply(job.companyusername)}>
                      Apply
                    </button>
                  </div>
                </div>
              )))}
            </div>
          </div>

          {/* Latest Opportunities Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#133E87]">
                Latest Opportunities
              </h2>
              <button
                onClick={() => navigate('/user/Jobs')}
                className="text-sm text-[#133E87] hover:underline flex items-center gap-1"
              >
                View All
                <ExternalLink size={16} />
              </button>
            </div>

            <div className="relative">
              {/* Slider Controls */}
              <button
                onClick={handlePrevious}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md z-10 flex items-center justify-center text-[#133E87]"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md z-10 flex items-center justify-center text-[#133E87]"
              >
                <ChevronRight size={20} />
              </button>

              {/* Cards Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-1000 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 25}%)`,
                    width: `${recentJobs.length * 25}%`,
                  }}
                >
                  {loading ? (
                    <div className="w-full flex-shrink-0 px-2 text-center">
                      <p>Loading jobs...</p>
                    </div>
                  ) : recentJobs.length === 0 ? (
                    <div className="w-full flex-shrink-0 px-2 text-center">
                      <p>No recent job listings available</p>
                    </div>
                  ) : (
                    recentJobs.map((job) => (
                      <div
                        key={job.companyusername}
                        className="w-1/4 flex-shrink-0 px-2"
                      >
                        <div className="bg-white border rounded-lg p-4 h-full hover:shadow-md transition-shadow">
                          <div className="flex flex-col h-full">
                            <div className="mb-2">
                              <h3 className="font-semibold text-lg truncate text-[#133E87]">
                                {job.jobprofile}
                              </h3>
                              <p className="text-gray-600 text-sm truncate">{job.company}</p>
                            </div>

                            <div className="flex-grow">
                              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                                <div className="truncate flex items-center gap-1">
                                  <MapPin size={14} className="text-gray-400"/> {job.location}
                                </div>
                                <div className="truncate flex items-center gap-1">
                                  <Briefcase size={14} className="text-gray-400"/>{job.experience}
                                </div>
                                <div className="col-span-2 truncate flex items-center gap-1">
                                  <IndianRupee size={14} className="text-gray-400"/> {formatSalary(job.salary)}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleApply(job.companyusername)}
                              className="w-full py-2 px-4 text-sm rounded-md text-white bg-[#133E87] hover:bg-[#608BC1] flex items-center justify-center gap-1"
                            >
                              Apply Now
                              <ExternalLink size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;