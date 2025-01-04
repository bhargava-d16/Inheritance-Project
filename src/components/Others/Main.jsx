import React from 'react'

const Main = () => {
  return (
    <div className='Main'>
      <div className='candidates'>
        <h3 className="text-xl text-[#1f2937] mt-1">Find Your Dream Job Here!</h3>
        <p className="">Explore exciting opportunities and achieve your career goals with us.</p>
        <div className='cards-button special '>
          <button className="bg-red-600  ">Sign Up</button>
          <br />
          <button className="bg-emerald-500 links  ">Explore More Companies</button>
        </div>
      </div>
      <div className='company'>
        <h3 className="text-xl text-[#1f2937] mt-1">Find the Perfect Candidate!</h3>
        <p className="">Connect with top talent and build your dream team today.</p>
        <div className='cards-button'>
          <button className="bg-red-600 ">Sign Up</button>
          <br />
          <button className="bg-emerald-500 links ">See Candidates</button>
        </div>
      </div>
    </div>
  )
}

export default Main