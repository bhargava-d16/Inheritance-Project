import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FaCheck, FaTimes } from "react-icons/fa";

const JobApplications = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchR, setsearchR] = useState(candidates)
  const [shortlisted, setShortlisted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [search, setsearch] = useState('')
  const [currPage, setcurrPage] = useState(1)
  const [totalPage, settotalPage] = useState(1)
  const [limit, setlimit] = useState(6)
  const { id } = useParams();
  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/EDashboard/myjobs/${id}`);
      console.log(response.data.candidates);
      const result = response.data.candidates;
      settotalPage(Math.ceil(result.length / limit))
      setCandidates(result || []);
      setsearchR(result || []);
      setShortlisted(response.data.shortlistedcandidates || []);
      setRejected(response.data.rejectedcandidates || []);
    } catch (error) {
      console.error('An Error Occurred', error);
    }
  };
  const handleAction = async (action, username) => {
    try {
      const jwtToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://localhost:8080/EDashboard/myjobs/${id}`,
        { username, id, action },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(`Candidate ${action === 'shortlist' ? 'Shortlisted' : 'Rejected'}:`, response.data);

      if (action === 'shortlist') {
        setShortlisted(response.data.updatedCandidates);
      } else if (action === 'reject') {
        setRejected((prevRejected) => [...prevRejected, username]);
      }
    } catch (error) {
      console.error(`Error performing ${action} action on candidate:`, error);
    }
  };

  const OnSearch = () => {
    console.log(search);
    const searchres = candidates.filter(elem =>
      elem.username && elem.username.includes(search) || elem.skills && elem.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
    )
    console.log(searchres);
    setsearchR(searchres)
  }
  const resetSearch = () => {
    console.log("reseting search")
    setsearchR(candidates)

  }
  useEffect(() => {
    fetchCandidates();
  }, []);
  const isShortlisted = (username) => {
    return shortlisted.some((candidate) => candidate.username === username);
  };
  const isRejected = (username) => {
    return rejected.includes(username);
  };
  const handlePrevPage = () => {
    if (currPage > 1) {
      setcurrPage(currPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currPage < totalPage) {
      setcurrPage(currPage + 1);
    }
  }

  return (
    <div className="mt-5 mx-auto w-11/12 lg:w-3/4">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Job Applications</h1>
      <div className='flex items-center justify-center mb-2'>
        <input
          className="search"
          type="text"
          placeholder="Search Here"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button className="JSbutton" onClick={OnSearch}>
          Search
        </button>
        <button className="JSbutton" onClick={resetSearch}>
          Reset
        </button>
      </div>
      {searchR.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md mt-4">
          <thead className="text-center bg-gray-200 text-black">
            <tr>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Skills</th>
              <th className="p-3 text-center">Experience</th>
              <th className="p-3 text-center">Actions</th>
              <th className="p-3 text-center">Profile</th>
            </tr>
          </thead>
          <tbody>
            {searchR.slice((currPage - 1) * limit, (currPage) * limit).map((elem, idx) => (
              <tr
                key={idx}
                className='bg-white border-b hover:bg-gray-50'
              >
                <td className="p-3">{elem.username || 'Unknown'}</td>
                <td className="p-3">{elem.skills?.join(', ') || 'No skills'}</td>
                <td className="p-3">{elem.experience || 'Not provided'}</td>
                <td>
                  <button
                    onClick={() => handleAction('shortlist', elem.username)}
                    className={`px-3 py-1 rounded ${isShortlisted(elem.username)
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    disabled={isShortlisted(elem.username) || isRejected(elem.username)}
                  >
                    {isShortlisted(elem.username) ? (
                      <span>
                        <FaCheck className="inline-block mr-1" />
                      </span>
                    ) : (
                      <FaCheck className="inline-block" />
                    )}
                  </button>
                  {!isShortlisted(elem.username) && (
                    <button
                      onClick={() => handleAction('reject', elem.username)}
                      className={`ml-2 px-3 py-1 rounded ${isRejected(elem.username)
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      disabled={isRejected(elem.username)}
                    >
                      {isRejected(elem.username) ? (
                        <span>
                          <FaTimes className="inline-block mr-1" /> Rejected
                        </span>
                      ) : (
                        <FaTimes className="inline-block" />
                      )}
                    </button>
                  )}
                </td>

                <td className="p-3">
                  <Link to={`/user/${elem.username}`} className="text-blue-600 no-underline hover:underline">
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="flex justify-center items-center text-gray-600">
          No Candidates Applied for this Job Post
        </p>
      )}

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
export default JobApplications;
