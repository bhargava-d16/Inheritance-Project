import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginJs = () => {
  const [info, setInfo] = useState({
    username:'',
    password:''
  })
  const navigate=useNavigate();

  const handleChange=(e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  const handleSubmit=async()=>{
    console.log(info);
    try {
      const response=await axios.post("http://localhost:8080/login/jobseeker",info)
      console.log(response);
      if(response.data.success){
        setInfo({
          username:'',
          password:''
        })
        navigate('/JSDashboard')

      }
    } catch (error) {
      alert(error.response.data.msg||error.response.data.error.details[0].message)

      console.log(error)
    }
  }
  return (
    <div>
      <div className="container">
        <div className='form bg-red-500 text-black border-3'>
          Login
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder='Enter your Username' value={info.username} onChange={(e) => handleChange(e)} />
            <input type="password" name="password" placeholder='Enter your password ' value={info.password} onChange={(e) => handleChange(e)} />
            <button onClick={handleSubmit}>Login!</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginJs