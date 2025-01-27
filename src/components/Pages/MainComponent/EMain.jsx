import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JSCard from '../../Others/JSCard';

const EMain = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [fdata, setFdata] = useState([]);


    const fetchJSdata = async () => {
        try {
            const response = await axios.get('http://localhost:8080/EDashboard');
            setData(response.data);
            setFdata(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJSdata();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
        requireddata(query);

    };
    const requireddata = (search) => {
        const filtered = data.filter((candidate) =>
            candidate.name.toLowerCase().includes(search) ||
            candidate.skills.some(skill => skill.toLowerCase().includes(search))
        );
        setFdata(filtered);
    }

    return (
        <div>
            <div className="heading bg-red-500">
                <h3>Empowering Your Hiring with Multi-Skilled Candidates</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique earum, necessitatibus blanditiis, consectetur in hic quidem natus voluptatem quasi voluptates, a labore deleni</p>
            </div>
            <div className="X">
                <div>
                    <input
                        className="search"
                        type="text"
                        placeholder="Search Here"
                        name="search"
                        value={search}
                        onChange={handleSearch}
                    />
                    <button className="JSbutton">Search</button>
                </div>
                <div className="candidates">
                    {fdata.length > 0 ? (
                        fdata.map((candidate, idx) => (
                            <JSCard
                                key={idx}
                                name={candidate.name}
                                location={candidate.place}
                                DOB={new Date(candidate.DOB).toLocaleDateString()}
                                skills={candidate.skills}
                                exp={candidate.workexperices || 'Not Available'}
                                username={candidate.username}
                            />
                        ))
                    ) : (
                        <p>No candidates found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EMain;
