
// export default function Section2(){
//     return(
//       <div>
//            <div className='section2div'>
//               <img className='imgsection2' src="/images/cooperation.png" alt="" />
//               <h4>Search Millions of jobs</h4>
//               <p>
//                  Get job in your dream company by filling the application form 
//               </p>
//            </div>
//       </div>
//     )
// }

import React from 'react'

export default function Section2() {
    return (
      
        <div className="transform transition-all duration-300 hover:scale-105">
            <div className="p-8 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">
                <img 
                    className="w-12 h-12 mb-4" 
                    src="/images/cooperation.png" 
                    alt="Feature icon" 
                />
                <h4 className="mb-3 text-xl font-semibold">Search Millions of jobs</h4>
                <p className="text-gray-600">
                    Get job in your dream company by filling the application form
                </p>
            </div>
        </div>
    )
}