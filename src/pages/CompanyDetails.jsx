import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { 
  Building2,
  MapPin,
  Wallet,
  Clock,
  Briefcase,
  Users,
  GraduationCap,
  Building,
  IndianRupee,
  Bookmark} from 'lucide-react';
  import UserNav from '../components/User/userNav';

const CompanyDetails = () => {
  const [jobDetails, setJobDetails] = useState();
  const [loading, setLoading] = useState(true);
  const { companyusername } = useParams();
  const navigate = useNavigate();  
  const [username, setusername] = useState();
  
  //mock data for job details testing
//   const exampleJob = {
//     id: "1",
//     jobprofile: "Senior Full Stack Developer",
//     company: "BNY Mellon",
//     location: "Pune, Maharashtra",
//     salary: "20L - 24L per year",
//     deadline: "2025-03-15T23:59:59.999Z",
//     type: "Full-time",
//     openings: 3,
//     description: "We are seeking an experienced Full Stack Developer...",
//     requirements: "MERN Stack, Python , CP , DSA",
//   };

const getusername = async () => {
    
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const  response = await axios.get("http://localhost:8080/user", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setusername(response.data.username)

    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
}
useEffect(() => {
    if (companyusername) {
      fetchJobDetails();
      getusername();
    } else {
      console.error('companyusername is undefined');
    }
  }, [companyusername]);
  

//   const fetchJobDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:8080/jobs/${companyusername}`);
//       const data = await response.json();
//       console.log('Fetched data:', data); // Add this line for debugging

//     //   const requirementsArray = data.requirements.split(',');
//       setJobDetails(data);
//         // setJobDetails(exampleJob);
//     } catch (error) {
//       console.error('Error fetching job details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };


const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/jobs/${companyusername}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        // setJobDetails(data[0]); // Update state only if data is valid
        if (Array.isArray(data) && data.length > 0) {
          setJobDetails(data[0]); // Use the first job for now
        } else if (data && typeof data === "object") {
          setJobDetails(data); // If it's a single object, not an array
        } else {
          console.error("Unexpected API response:", data);
        }
        
        console.log('Job details:', jobDetails);
      } else {
        console.error('Empty or invalid response data');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Job details not found</div>
      </div>
    );
  }
  const requirementsArray = jobDetails.requirements
  ? jobDetails.requirements.split(',')
  : [];

  const handleApply = async (e) => {
   const newappliedCandidatesArray = [...jobDetails.appliedCandidatesID ,username]
    const newJobDetails = {...jobDetails,
      appliedCandidatesID: newappliedCandidatesArray
    };
    try {
      await axios.put(`http://localhost:8080/jobs/${companyusername}`, newJobDetails);
      // alert('Application submitted successfully!');
      const storedAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
     storedAppliedJobs.push(companyusername);
     localStorage.setItem('appliedJobs', JSON.stringify(storedAppliedJobs));
     
     toast.success('Application submitted successfully!');
     navigate('/user/jobs');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
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
    <UserNav />
    <div className="max-w-4xl mx-auto p-6">
      {/* Job Header Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#133E87' }}>{jobDetails.jobprofile}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center">
            <Building2 className="w-5 h-5 mr-2" style={{color : '#133E87'}} />
            <span className="font-medium mr-2">Company:</span>
            <span>{jobDetails.company}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" style={{color : '#133E87'}} />
            <span className="font-medium mr-2">Location:</span>
            <span>{jobDetails.location}</span>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center border-b md:border-b-0 pb-4 md:pb-0">
                <Wallet className="w-5 h-5 mr-3" style={{ color: '#133E87' }} />
                <div>
                  <span className="px-3 font-medium block mb-1">Salary</span>
                  <span className="text-gray-600">
                      <IndianRupee size={16} className="text-gray-400 inline-block mr-1" />
                      {jobDetails.salary}
                </span>
                </div>
              </div>
          
          <div className="flex items-center border-b md:border-b-0 pb-4 md:pb-0">
          <Clock className="w-5 h-5 mr-3" style={{ color: '#133E87' }} />
          <div>
            <span className="font-medium block mb-1">Application Deadline</span>
            <span className="text-gray-600">
              {new Date(jobDetails.deadline).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          </div>
          
          <div className="flex items-center border-b md:border-b-0 pb-4 md:pb-0">
          <Briefcase className="w-5 h-5 mr-3" style={{ color: '#133E87' }} />
                <div>
                  <span className="font-medium block mb-1">Job Type</span>
                  <span className="text-gray-600">{jobDetails.type}</span>
                </div>
              </div>
          
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-3" style={{ color: '#133E87' }} />
                <div>
                  <span className="font-medium block mb-1"> Applicants </span>
                  <span className="text-gray-600">{jobDetails.appliedCandidatesID.length}</span>
                </div>
              </div>
            </div>
          </div>

      {/* Job Description Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#133E87' }}>
          <Briefcase className="w-6 h-6 mr-2" />
          Job Description</h2>
        <div className="text-gray-600 whitespace-pre-line">
          {jobDetails.description}
        </div>
      </div>

      {/* Requirements Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#133E87' }}>
          <GraduationCap className="w-6 h-6 mr-2" />
          Skill Requirements</h2>
        <div className="text-gray-600 whitespace-pre-line">
          {/* {jobDetails.requirements} */}

            {requirementsArray.length > 0 ? (
                <ul className="list-disc pl-6">
                 {requirementsArray.map((requirement, index) => (
                <li key={index}>{requirement.trim()}</li>
                        ))}
                </ul>
                    ) : (
                <p>No specific requirements listed for this job.</p>
                )}
        </div>
      </div>

      {/* Company Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: '#133E87' }}>
          <Building className="w-6 h-6 mr-2" />
          About : {jobDetails.jobprofile}</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-medium w-24">Company:</span>
            <span className="text-gray-600">{jobDetails.company}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">Location:</span>
            <span className="text-gray-600">{jobDetails.location}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">Number of Openings :</span>
            <span className="text-gray-600">{jobDetails.openings}</span>
          </div>
        </div>
      </div>
      {/* {Bookmark} */}


      {/* Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleApply}
            className="w-full py-3 rounded-lg hover:bg-[#608BC1] transition-colors font-medium "
            style={{ backgroundColor: '#133E87', color: '#FFFFFF' }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
   </div>
</div>
  );
};

export default CompanyDetails;