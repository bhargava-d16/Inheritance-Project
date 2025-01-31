import React from 'react'
import { useLocation } from 'react-router-dom'
const AllCandidates = () => {
    const location=useLocation()
    const {data}=location.state||{}
    console.log(data)
  return (
    <div>
        <div className="allcandidates">
            
        </div>
    </div>
  )
}

export default AllCandidates