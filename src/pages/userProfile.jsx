import React from 'react'
import Backoption from '../components/userProfile/Backoption'
import Profileform from '../components/userProfile/Profileform'


const userProfile = () => {
  return (
    <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">

        <Backoption className="bg-green-500"/>
        <Profileform />

    </div>
  )
}

export default userProfile