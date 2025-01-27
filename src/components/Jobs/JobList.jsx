// // Search Bar with Location Filter

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import JobCard from './JobCard';

// const Jobs = ({ jobs, loading }) => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     salary: 'All',
//     experience: 'All',
//     location: 'All'
//   });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Extract unique values for filter options
//   const locations = jobs ? [...new Set(jobs.map(job => job.location))] : [];

//   const experiences = [
//     'All',
//     '0-1 Years',
//     '1-3 Years',
//     '3-5 Years',
//     '5+ Years',
//   ]
//   const salaryRanges = [
//     'All',
//     '0-10L',
//     '10L-20L',
//     '20L-30L',
//     '30L+'
//   ];

//   const handleApply = (companyusername) => {
//     navigate(`/user/jobs/${companyusername}`);
//   };
  

// // Helper function to match experience ranges
// const matchesExperienceRange = (jobExperience, filterRange) => {
//   const numericPart = jobExperience.replace(/[^\d]/g, '');
//   const experience = parseInt(numericPart);
//   switch(filterRange) {
//     case '0-1 years': return experience <= 1;
//     case '1-3 years': return experience> 1 && experience <= 3;
//     case '3-5 years': return experience > 3 && experience <= 5;
//     case '5+ years': return experience > 5;
//     default: return true;
//   }
// };

// // Helper function to match salary ranges
// const matchesSalaryRange = (jobSalary, filterRange) => {
//   const salary = parseInt(jobSalary);
//   switch(filterRange) {
//     case '0-10L': return salary <= 1000000 ;
//     case '10L-20L': return salary > 1000000  && salary <= 2000000 ;
//     case '20L-30L': return salary > 2000000  && salary <= 3000000 ;
//     case '30L+': return salary > 3000000 ;
//     default: return true;
//   }
// };


//   const filteredJobs = jobs?.filter(job => {
//     const matchesSearch = job.jobprofile.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesLocation = filters.location === 'All' || job.location === filters.location;
   
//     // Parse experience range for comparison
//     const matchesExperience = filters.experience === 'All' || matchesExperienceRange(job.experience, filters.experience);
    
//     // Parse salary range for comparison
//     const matchesSalary = filters.salary === 'All' || matchesSalaryRange(job.salary, filters.salary);

//     return matchesSearch && matchesLocation && matchesExperience && matchesSalary;
//   }) || [];


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!loading && (!jobs || jobs.length === 0)) {
//     return <div className="text-center">No jobs found. Please check back later</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div 
//         className="min-h-screen"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #e5e7eb 1px, transparent 1px),
//             linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
//           `,
//           backgroundSize: '4rem 4rem'
//         }}
//       >
//         <div className="max-w-6xl mx-auto p-4">
//           {/* Search and Filter Section */}
//           <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//             {/* Search Bar */}
//             <div className="flex flex-col md:flex-row gap-4 mb-4">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search jobs or companies..."
//                 className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133E87]"
//               />
//               <button 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className="px-6 py-2 rounded-lg border border-[#133E87] text-[#133E87] hover:bg-gray-50 transition-colors"
//               >
//                 Filters {isFilterOpen ? '▼' : '▲'}
//               </button>
//             </div>

//             {/* Filter Options */}
//             {isFilterOpen && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                 {/* Location Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                   <select
//                     value={filters.location}
//                     onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133E87]"
//                   >
//                     <option value="All">All Locations</option>
//                     {locations.map(location => (
//                       <option key={location} value={location}>{location}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Experience Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
//                   <select
//                     value={filters.experience}
//                     onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133E87]"
//                   >
//                     <option value="All">All Experience Levels</option>
//                     {experiences.map(exp => (
//                       <option key={exp} value={exp}>{exp}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Salary Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
//                   <select
//                     value={filters.salary}
//                     onChange={(e) => setFilters(prev => ({ ...prev, salary: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133E87]"
//                   >
//                     <option value="All">All Salary Ranges</option>
//                     {salaryRanges.map(range => (
//                       <option key={range} value={range}>{range}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Job Listings */}
//           <div className="space-y-4">
//             {filteredJobs.length === 0 ? (
//               <div className="text-center py-8 bg-white rounded-lg shadow">
//                 <p className="text-gray-600">No jobs match your search criteria.</p>
//               </div>
//             ) : (
//               filteredJobs.map((job) => (
//                 <JobCard
//                   key={job.companyusername}
//                   job={job}
//                   onApply={handleApply}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Briefcase, 
  Wallet,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Jobs = ({ jobs, loading }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs,setAppliedJobs] = useState([]);
  const [filters, setFilters] = useState({
    salary: 'All',
    experience: 'All',
    location: 'All'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique values for filter options
  const locations = jobs ? [...new Set(jobs.map(job => job.location))] : [];

  const experiences = [
    'All',
    '0-1 Years',
    '1-3 Years',
    '3-5 Years',
    '5+ Years'
  ];
  
  const salaryRanges = [
    'All',
    '0-10L',
    '10L-20L',
    '20L-30L',
    '30L+'
  ];


  useEffect(() => {
    const storedAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setAppliedJobs(storedAppliedJobs || []);
  }, []);


  const handleApply = (companyusername) => {
    const updatedAppliedJobs = [...appliedJobs, companyusername];
    setAppliedJobs(updatedAppliedJobs);
    localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
    navigate(`/user/jobs/${companyusername}`);
  };

  const extractExperienceYears = (experienceStr) => {
    // Return 0 if experienceStr is undefined or null
    if (!experienceStr) return 0;
    
    // Convert to string in case it's a number
    const expString = String(experienceStr);
    const matches = expString.match(/\d+/g);
    if (!matches) return 0;
    return parseInt(matches[0]);
  };

  const matchesExperienceRange = (jobExperience, filterRange) => {
    if (filterRange === 'All') return true;
    
    // Handle undefined or null job experience
    if (!jobExperience) return false;
    
    const years = extractExperienceYears(jobExperience);
    
    switch(filterRange) {
      case '0-1 Years':
        return years <= 1;
      case '1-3 Years':
        return years > 1 && years <= 3;
      case '3-5 Years':
        return years > 3 && years <= 5;
      case '5+ Years':
        return years > 5;
      default:
        return true;
    }
  };

  const matchesSalaryRange = (jobSalary, filterRange) => {
    // Handle undefined or null salary
    if (!jobSalary) return filterRange === 'All';
    
    const salary = parseInt(jobSalary);
    switch(filterRange) {
      case '0-10L':
        return salary <= 1000000;
      case '10L-20L':
        return salary > 1000000 && salary <= 2000000;
      case '20L-30L':
        return salary > 2000000 && salary <= 3000000;
      case '30L+':
        return salary > 3000000;
      default:
        return true;
    }
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = 
      (job.jobprofile?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (job.company?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesLocation = filters.location === 'All' || job.location === filters.location;
    const matchesExperience = matchesExperienceRange(job.experience, filters.experience);
    const matchesSalary = matchesSalaryRange(job.salary, filters.salary);

    return matchesSearch && matchesLocation && matchesExperience && matchesSalary;
  }) || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && (!jobs || jobs.length === 0)) {
    return <div className="text-center">No jobs found. Please check back later</div>;
  }

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
        <div className="max-w-6xl mx-auto p-4">
          {/* Search and Filter Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search jobs or companies..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                />
              </div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-6 py-2 rounded-lg border border-[#133E87] text-[#133E87] hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal size={20} />
                Filters 
                {isFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {isFilterOpen && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1  items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                  >
                    <option value="All">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1  items-center gap-2">
                    <Briefcase size={16} className="text-gray-500" />
                    Experience
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                  >
                    {experiences.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1  items-center gap-2">
                    <Wallet size={16} className="text-gray-500" />
                    Salary Range
                  </label>  
                  <select
                    value={filters.salary}
                    onChange={(e) => setFilters(prev => ({ ...prev, salary: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133E87]"
                  >
                    {salaryRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow">
                <p className="text-gray-600">No jobs match your search criteria.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.companyusername}
                  job={job}
                  onApply={handleApply}
                  appliedJobs={appliedJobs}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;