import React from 'react'
const Header = () => {
  return (
    <div className='header'>
      <div className='flex items-center mr-1'>
        <img className='i' src="src\assets\img_2710324_2025_01_03_18_51_01.png" alt="" />
        <a className='font-semibold text-lg' href=''>Job Portal</a>
      </div>
      <div className='nav'>
        <a href=''>Home</a>
        <a href=''>About Us</a>
        <a href=''>Testimonials</a>
        <a href=''>Contact Us</a>
      </div>
    </div>
  )
}

export default Header