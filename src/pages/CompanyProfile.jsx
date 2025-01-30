import React from 'react'
import Backoption from '../components/companyProfile/BackOptionc.jsx'
import Profileform from '../components/companyProfile/Profileform.jsx'
import Profilepic from '../components/companyProfile/ProfilePic.jsx'
import { useParams } from 'react-router-dom'

const CompanyProfile = () => {
  const username = useParams();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div>
        <Backoption />
        <div className=' flex flex-row flex-around justify-around alignitems-center '>

          <Profilepic />
          <Profileform />

        </div>

      </div>
    </div>
  )
}

export default CompanyProfile