// import React from 'react'
// import Section1 from './Section1'
// import Section2 from './Section2'
// import Testimonial from './testimonial'
// const Main = () => {
//     return (
//         <div>
//             <Section1 />
//             <div className='section2'>
//                 <Section2 />
//                 <Section2 />
//                 <Section2 />
//                 <Section2 />
//             </div>

//             <Testimonial />
//         </div>
//     )
// }

// export default Main



import React from 'react';
import Section1 from './Section1'
import Section2 from './Section2'
import Testimonial from './testimonial' 

const GridBackground = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default function Main() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
    style={{ marginTop: '-6rem' }} >
      <GridBackground>
        <main className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <Section1 />
        </main>
        
        <div className="grid gap-8 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:grid-cols-4"
        style={{ marginTop: '-4rem' }} >
          <Section2 />
          <Section2 />
          <Section2 />
          <Section2 />
        </div>
      </GridBackground>
      
      <Testimonial />
    </div>
  );
}