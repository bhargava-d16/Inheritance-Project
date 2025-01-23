import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
const JobPost = () => {
    const navigate = useNavigate()
    const [details, setdetails] = useState({
        jobprofile: '',
        location: '',
        type: '',
        desc: '',
        requirements: '',
        salary: '',
        openings: 0,
        deadline: '',
        experience: ''
    })

    const handlechange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }

    const jwtToken = localStorage.getItem("jwtToken")
    const handleSubmit = async () => {
        console.log(details);
        try {
            const response = await axios.post('http://localhost:8080/EDashboard/jobposting', {
                details: details
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            });

            alert("Job has been Posted successfully");
            setdetails({
                jobprofile: '',
                location: '',
                type: '',
                desc: '',
                requirements: '',
                salary: '',
                openings: 0,
                deadline: ''
            }
            )
            navigate("/EDashboard")

        } catch (error) {
            console.log('ERROR', error)
        }
    }
    return (
        <div>
            <div className="heading">
                <h3>Looking to Hire? Post Your Job and Get Noticed</h3>
                <p>Reach out to thousands of professionals and get your job seen by the right candidates. Create job posts that attract the best talent with just a few clicks.</p>
            </div>

            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <form className="text-black  space-y-6" onSubmit={(e) => e.preventDefault()}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label htmlFor="jobprofile" className="block text-sm font-medium">Job Title</label>
                            <input
                                type="text"
                                placeholder="Job Title"
                                name="jobprofile"
                                onChange={(e) => handlechange(e)}
                                value={details.jobprofile}
                                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85]"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="location" className="block text-sm font-medium">Location</label>
                            <input
                                type="text"
                                placeholder="Location"
                                name="location"
                                onChange={(e) => handlechange(e)}
                                value={details.location}
                                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85]"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="type" className="block text-sm font-medium">Type Of Job</label>
                            <input
                                type="text"
                                placeholder="Job Type"
                                name="type"
                                onChange={(e) => handlechange(e)}
                                value={details.type}
                                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85 focus:shadow-md transition-all duration-300 ease-in-out]"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="desc" className="block text-sm font-medium">Job Description</label>
                            <textarea
                                placeholder="Description"
                                name="desc"
                                onChange={(e) => handlechange(e)}
                                value={details.desc}
                                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85]"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <label htmlFor="requirements" className="block text-sm font-medium">Requirements</label>
                        <textarea
                            placeholder="Requirements"
                            name="requirements"
                            onChange={(e) => handlechange(e)}
                            value={details.requirements}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85]"
                        />

                        <label htmlFor="salary" className="block text-sm font-medium">Salary</label>
                        <input
                            type="text"
                            placeholder="Salary"
                            name="salary"
                            onChange={(e) => handlechange(e)}
                            value={details.salary}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85]"
                        />

                        <label htmlFor="experience" className="block text-sm font-medium">Experience Needed</label>
                        <input
                            type="text"
                            placeholder="Experience Needed"
                            name="experience"
                            onChange={(e) => handlechange(e)}
                            value={details.experience}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85]"
                        />

                        <label htmlFor="openings" className="block text-sm font-medium">Openings</label>
                        <input
                            type="text"
                            placeholder="Openings"
                            name="openings"
                            onChange={(e) => handlechange(e)}
                            value={details.openings}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85]"
                        />

                        <label htmlFor="deadline" className="block text-sm font-medium">Deadline</label>
                        <input
                            type="date"
                            placeholder="Deadline"
                            name="deadline"
                            onChange={(e) => handlechange(e)}
                            value={details.deadline}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#133E85]"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full px-4 py-3 bg-[#133E85] rounded-lg text-white font-semibold hover:bg-emerald-700 focus:ring-2 focus:ring-[#133E85]"
                    >
                        Post Job
                    </button>
                </form>
            </div>
        </div>

    )
}

export default JobPost