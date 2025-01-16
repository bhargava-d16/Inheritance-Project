import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JSCard from '../../Others/JSCard';
import { Link } from 'react-router-dom';
import debounce from 'debounce';

const EMain = () => {
    const [data, setData] = useState([]);
    const [fdata, setFdata] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const debouncedSearch = debounce((query) => {
        fetchJSdata(query, filter, currPage);
    }, 200);
    const fetchJSdata = async (query = search, filterValue = filter, page = currPage) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            setLoading(true);

            const response = await axios.get('http://localhost:8080/EDashboard', {
                params: {
                    search: query,
                    filter: filterValue,
                    page,
                    limit: 10,
                },
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            const { data, totalPages, currentPage } = response.data;
            setData(data);
            setFdata(data); // Only store filtered data
            setTotalPages(totalPages);
            setCurrPage(currentPage);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        debouncedSearch(search); 
    }, [search, filter, currPage]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query); // Update search state immediately
        debouncedSearch(query); // Debounce API call
    };

    const clearSearch = () => {
        setSearch('');
        setCurrPage(1);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrPage(1);
    };

    const handleNextPage = () => {
        if (currPage < totalPages) {
            setCurrPage(currPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currPage > 1) {
            setCurrPage(currPage - 1);
        }
    };

    return (
        <div className='Emain'>
            <div className="heading bg-red-500">
                <h3>Empowering Your Hiring with Multi-Skilled Candidates</h3>
                <p>
                    Discover a pool of talented, multi-skilled candidates ready to elevate your
                    business. Our platform simplifies the hiring process, ensuring you find the right
                    fit quickly and efficiently.
                </p>
            </div>
            <div className="X">
                <div>
                    <input
                        className="search"
                        type="text"
                        placeholder="Search Here"
                        value={search}
                        onChange={handleSearch}
                    />
                    <button className="JSbutton" onClick={clearSearch}>
                        Clear
                    </button>
                </div>
                <div className="candidatesFilterbuttons">
                    <button
                        className="filterbtns"
                        onClick={() => handleFilterChange('opentooffers')}
                    >
                        Open to Offers
                    </button>
                    <button className="filterbtns" onClick={() => handleFilterChange('all')}>
                        All Candidates
                    </button>
                    <button className="filterbtns" onClick={() => handleFilterChange('notworking')}>
                        Currently Not Working
                    </button>
                </div>
                <div className="candidates">
                    {loading ? (
                        <p>Loading candidates...</p>
                    ) : fdata.length > 0 ? (
                        fdata.map((candidate, idx) => (
                            <JSCard
                                key={idx}
                                name={candidate.name}
                                location={candidate.place}
                                DOB={new Date(candidate.DOB).toLocaleDateString()}
                                skills={candidate.skills}
                                exp={candidate.workexperices || 'Not Available'}
                                username={candidate.username}
                                id={candidate._id}
                                isshortlisted={candidate.isshortlisted}
                                opentooffers={candidate.opentooffers}
                            />
                        ))
                    ) : (
                        <p>No candidates found</p>
                    )}
                </div>
            </div>
            <div className='last'>

            <div className="pagination flex items-center justify-center gap-10">
                <button
                    className="prev-button bg-blue-700"
                    disabled={currPage === 1}
                    onClick={handlePrevPage}
                >
                    Previous
                </button>
                <span>
                    Page {currPage} of {totalPages}
                </span>
                <button
                    className="next-button bg-blue-600"
                    disabled={currPage === totalPages}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
            <div className="edbbutton flex items-center justify-center gap-10">
                <Link to="/EDashboard/allcandidates" state={{ data }}>
                    View All Candidates
                </Link>
                <Link to="/EDashboard/postjob">Post a Job</Link>
            </div>
            </div>
        </div>
    );
};

export default EMain;
