import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JSCard from '../../Others/JSCard';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const EMain = () => {
    const [data, setData] = useState([]);
    const [fdata, setFdata] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const fetchJSdata = async (filterValue = filter, page = currPage) => {
        try {
            const jwtToken = localStorage.getItem('accessToken');
            setLoading(true);

            const response = await axios.get('http://localhost:8080/EDashboard', {
                params: {
                    search: search,
                    filter: filterValue,
                    page,
                    limit: 10,
                },
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            const { data, totalPages, currentPage } = response.data;
            console.log(data);
            setData(data);
            setFdata(data);
            setTotalPages(totalPages);
            setCurrPage(currentPage);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };


    const OnSearch = async () => {
        try {
            const searchres = await axios.get('http://localhost:8080/EDashboard/search', {
                params: { search }
            });
            setFdata(searchres.data.data);
            setTotalPages(1);
            setCurrPage(1);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const resetSearch = () => {
        setSearch(''); 
        setFilter('all'); 
        setFdata(data); 
        setTotalPages(Math.ceil(data.length / 10)+1);
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

    useEffect(() => {
        fetchJSdata(filter, currPage);
    }, [filter, currPage]);

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
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="JSbutton" onClick={OnSearch}>
                        Search
                    </button>
                    <button className="JSbutton" onClick={resetSearch}>
                        Reset
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
                        <FaChevronLeft></FaChevronLeft>
                    </button>
                    <span>
                        Page {currPage} of {totalPages}
                    </span>
                    <button
                        className="next-button bg-blue-600"
                        disabled={currPage === totalPages}
                        onClick={handleNextPage}
                    >
                        <FaChevronRight></FaChevronRight>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EMain;
