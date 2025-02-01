import {
  MapPin,
  Briefcase,
  IndianRupee,
  BriefcaseBusiness,
  ExternalLink,
  Bookmark,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
const formatSalary = (salary) => {
  if (!salary) return "Not Disclosed";

  const inLakhs = salary / 100000;

  if (inLakhs >= 100) {
    const inCrores = inLakhs / 100;
    return `₹${inCrores.toFixed(2)} Cr/year`;
  }

  return `₹${inLakhs.toFixed(2)} L/year`;
};

const JobCard = ({ job, onApply, appliedJobs }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  console.log(job);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("jobBookmarks") || "[]");
    setIsBookmarked(bookmarks.includes(job.companyusername));
  }, [job.companyusername]);

  const handleBookmark = async (jobid) => {
    setIsBookmarked(!isBookmarked);
    console.log(jobid);
    const username = localStorage.getItem("username");
    const response = await axios.post(
      "https://inheritance-project-4kr9.onrender.com/user/jobs",
      {
        jobid,
        username,
      }
    );
  };

  return (
    <div className="bg-white shadow hover:shadow-lg transition-shadow duration-300 rounded-lg p-6">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold" style={{ color: "#133E87" }}>
            {job.jobprofile}
          </h2>

          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <Briefcase size={16} className="text-gray-400" />
            {job.companyusername}
          </p>

          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-gray-400" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <IndianRupee size={16} className="text-gray-400" />
              <span>{formatSalary(job.salary)}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <BriefcaseBusiness size={16} className="text-gray-400" />
              <span>{job.experience}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-end">
          <button
            onClick={() => handleBookmark(job._id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isBookmarked
                ? "text-[#133E87] bg-[#CBDCEB]"
                : "text-gray-600 hover:bg-[#608BC1] hover:text-white"
            }`}
            aria-label={isBookmarked ? "Saved" : "Save"}
          >
            <Bookmark
              size={18}
              className={`${
                isBookmarked ? "fill-[#133E87] text-[#133E87]" : "text-gray-600"
              }`}
            />
            <span className="text-sm font-medium">
              {isBookmarked ? "Saved" : "Save"}
            </span>
          </button>

          <button
            onClick={() => onApply(job._id)}
            style={{ backgroundColor: "#133E87" }}
            className="px-6 py-2 rounded-lg hover:bg-[#608BC1] transition-colors text-white flex items-center gap-2"
          >
            Apply
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
