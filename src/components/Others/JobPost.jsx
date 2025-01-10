import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
const JobPost = () => {
    const navigate=useNavigate()
    // localStorage.clear()
    const [details, setdetails] = useState({
        jobprofile: '',
        location: '',
        type: '',
        desc: '',
        requirements: '',
        salary: '',
        openings: 0,
        deadline: ''
    })
    
    const handlechange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSubmit = async() => {
        console.log(details);
        try {
            const token=localStorage.getItem('jwtToken')
            console.log(token)
            const response=await axios.post('http://localhost:8080/EDashboard/jobposting',details, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
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
                })
                navigate("/EDashboard")
        
        }catch (error) {
            console.log('ERROR',error)        
        }
    }
    return (
        <div >
            <form className='text-black' onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder='Job pROFILE Type here' name='jobprofile' onChange={(e) => handlechange(e)} value={details.jobprofile} />
                <input type="text" placeholder='Location Type here' name='location' onChange={(e) => handlechange(e)} value={details.location} />
                <input type="text" placeholder='Type Type here' name='type' onChange={(e) => handlechange(e)} value={details.type} />
                <textarea type="text" placeholder='Desc Type here' name='desc' onChange={(e) => handlechange(e)} value={details.desc} />
                <textarea type="text" placeholder='Requirements Type here' name='requirements' onChange={(e) => handlechange(e)} value={details.requirements} />
                <input type="text" placeholder= 'Salary Type here' name='salary' onChange={(e) => handlechange(e)} value={details.salary} />
                <input type="text" placeholder='Openings  Type here' name='openings' onChange={(e) => handlechange(e)} value={details.openings} />
                <input type="date" placeholder='Deadline Type here' name='deadline' onChange={(e) => handlechange(e)} value={details.deadline} />
                <button onClick={handleSubmit} className='px-2 py-3 bg-emerald-600 rounded-lg text-white'>Post In</button>
            </form>
        </div>
    )
}

export default JobPost