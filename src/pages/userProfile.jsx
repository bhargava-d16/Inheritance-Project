import React from 'react'
import Profileform from '../components/userProfile/Profileform'
// import Socialmedialist from '../components/userProfile/Socialmedialist'
import Profilepic from '../components/userProfile/ProfilePic'


const userProfile = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        
      <div className=' flex flex-row flex-around justify-around alignitems-center '>

        <div>
          <Profilepic />
        </div>
        <Profileform />

      </div>
    </div>
  )
}

export default userProfile





