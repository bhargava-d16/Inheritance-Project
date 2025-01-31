import React from 'react'
import Backoption from '../components/companyProfile/BackOptionc.jsx'
import Profileform from '../components/companyProfile/Profileform.jsx'
import ProfilePic from '../components/companyProfile/ProfilePic.jsx'
import { useParams } from 'react-router-dom'
import ENavbar from '../components/Pages/Navbars/ENavbar.jsx'

const CompanyProfile = () => {
  const username = useParams();

  return (     
    <div className="min-h-screen w-full bg-gray-50">       
      <div className="w-full bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50">         
        <ENavbar />       
      </div>       
      <div className="w-full min-h-screen pt-20 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">         
        <div className="w-full max-w-7xl mx-auto px-4 py-8">           
          <div className="flex flex-col lg:flex-row gap-8 items-start">             
            <div className="lg:sticky lg:top-24 w-full lg:w-auto">               
              <ProfilePic />             
            </div>             
            <div className="flex-1 w-full">               
              <Profileform />             
            </div>           
          </div>         
        </div>       
      </div>     
    </div>   
  ); 
}

export default CompanyProfile