import React from 'react'
import ENavbar from '../Pages/Navbars/ENavbar'
import Footer from '../Others/Footer'
import { Outlet } from 'react-router-dom'
const Edashboard = () => {
  return (
    <div>
<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <ENavbar></ENavbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Edashboard