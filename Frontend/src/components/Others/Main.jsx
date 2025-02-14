
import React, { useEffect } from 'react';
import Section1 from './Section1'
import Section2 from './Section2'
import Testimonial from './testimonial'
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('User');
    if (user) {
      if (user == 'Candidate') navigate('/user');
      else if (user == 'Company') navigate('/Edashboard');
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
      style={{ marginTop: '-6rem' }} >
      <GridBackground>
        <main className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <Section1 />
        </main>

        <div className="grid gap-8 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:grid-cols-4"
          style={{ marginTop: '-4rem' }} >
          <Section2 
                    tag='Unlock Career Opportunities'  
                    info='Browse through open jobs and take the next step in your career.'                    
                />
                <Section2
                    tag='Hire Talented Professionals'  
                    info='Access top candidates and streamline your hiring process.'                    
                />
                <Section2 
                  tag='Build Your Dream Team'  
                  info='Connect with skilled candidates to drive your business forward.'                  
                />
                <Section2 
                   tag='Find Your Perfect Job here'  
                   info='Explore job listings and apply to roles that match your skills.'
                />  
        </div>
      </GridBackground>
      <Testimonial />
    </div>
  );
}