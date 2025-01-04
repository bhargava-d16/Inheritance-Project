import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Others/Header'
import Main from './components/Others/Main'
import Footer from './components/Others/Footer'
import Heading from './components/Others/Heading'

function App() {


  return (
    <>
      <Header></Header>
      <div className='y flex justify-evenly'>
        <div>
          <Heading></Heading>
          <Main></Main>
        </div>
        <div className='flex items-center'>
          <img className='main-image' src="src\assets\WhatsApp Image 2025-01-04 at 04.44.07_16072072.jpg" alt=" Background Image" />
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
