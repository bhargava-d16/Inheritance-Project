
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [fdata, setFdata] = useState([]);
  const [search, setsearch] = useState('')

  const fetchJobs = async () => {
    const jwtToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get('http://localhost:8080/EDashboard/myjobs', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const result = response.data.jobs;
      console.log(result)
      setJobs(result);
      setFdata(result);
      setTotalPage(Math.ceil(result.length / limit));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  const handlePrevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currPage < totalPage) {
      setCurrPage(currPage + 1);
    }
  };
  const OnSearch = () => {
    const searchres = jobs.filter(elem => elem.jobprofile.toLowerCase().includes(search.toLowerCase()));
    setFdata(searchres);
    console.log(searchres);
  }
  return (
    <div>
      <div className="heading">
        <h3>Your Job Postings Dashboard</h3>
        <p>Easily manage your job listings, track applicant activity, and streamline your recruitment process with intuitive tools.</p>
      </div>
      <div className="search-jobs">
        <input
          className=" search"
          type="text"
          placeholder="Search Here"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button className="JSbutton" onClick={OnSearch}>
          Search
        </button>

      </div>
      <table className='Jobstable mt-5'>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Date Posted</th>
            <th>Applicants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fdata.length > 0 && fdata.slice((currPage - 1) * limit, currPage * limit).map((job, idx) => (
            <tr key={idx}>
              <td>{job.jobprofile}</td>
              <td>{new Date(job.createdAt).toLocaleDateString()}</td>
              <td>{job.appliedCandidatesID && job.appliedCandidatesID.length ? job.appliedCandidatesID.length : 0}</td>
              <td>
                <Link to={`/EDashboard/myjobs/${job._id}`} className='text-black' >View Candidates</Link>
              </td>
            </tr>
          )) || <p className='flex align-center justify-center '>No Jobs..</p>}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currPage === 1}>
          <FaChevronLeft></FaChevronLeft>
        </button>
        Page {currPage} of {totalPage}
        <button onClick={handleNextPage} disabled={currPage === totalPage}>
          <FaChevronRight></FaChevronRight>
        </button>
      </div>
      

    </div>
  );
};

export default AllJobs;
