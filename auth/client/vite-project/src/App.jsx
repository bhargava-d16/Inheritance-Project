import React from 'react'
import './App.css'
import Registeruser from './components/auth/registeruser'
import Registeremp from './components/auth/registeremp'
import Loginuser from './components/auth/loginuser'
import Loginemp from './components/auth/loginemp'
import { Routes,Route } from 'react-router-dom'
function App() {
  return (
     <Routes>

         <Route
             
            path='/register/jobseeker'
            element={<Registeruser/>}
         />
         <Route 
            path='/login/jobseeker'
            element={<Loginuser/>}
         />
         <Route 
            path='/register/employer'
            element={<Registeremp/>}
         />
         <Route 
            path='/login/employer'
            element={<Loginemp/>}
         />



     </Routes>
  )
}

export default App
