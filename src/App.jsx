import { useState } from 'react'
import './App.css'
import Header from "./components/others/Header"
import Section1 from './components/Others/Section1'
import Section2 from './components/Others/Section2'
import Footer from './components/Others/Footer'
import Testimonial from './components/Others/testimonial'
function App() {


  return (
    <>
      <Header/>
      <Section1/>
      <div className='section2'>
        <Section2/>
        <Section2/>
        <Section2/>
        <Section2/>
      </div>
      
      <Testimonial/>
      <Footer/>
      
    </>
  )
}

export default App
