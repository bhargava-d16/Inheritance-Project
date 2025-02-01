import { useState, useEffect } from "react";
import JobList from "../components/Jobs/JobList";
import Backoption from "../components/userProfile/Backoption";
import UserNav from "../components/User/UserNav";
import Footer from "../components/Others/Footer";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://inheritance-project-4kr9.onrender.com/jobs"
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#CBDCEB", minHeight: "100vh" }}>
      {/* <Backoption/> */}
      <UserNav />
      <JobList jobs={jobs} loading={loading} />
      <Footer />
    </div>
  );
};

export default JobsPage;
