
import React from 'react';
import { ArrowRight, Briefcase, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Card({ icon, title, description, of }) {
  const Navigate = useNavigate();
  const user = localStorage.getItem('User');

  const handleClick = () => {

    if (of === 'company') {
      if (user) {
        if(user==='Company') Navigate('/EDashboard');
        else Navigate('/login/employer');
      }else Navigate('/login/employer');
    } else if (of === 'candidate') {
      if (user) {
        if(user==='Candidate') Navigate('/user');
        else Navigate('/login/jobseeker');
      }else Navigate('/login/jobseeker');
    }
  }
  return (

    <div
      className="p-6 rounded-xl transition-all duration-300 cursor-pointer group hover:shadow-lg"
      style={{
        backgroundColor: '#CBDCEB',
        borderRight: '4px solid #133E87',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-lg transition-colors duration-300 group-hover:bg-[#608BC1]"
          style={{ backgroundColor: '#133E87' }}
        >
          {icon === 'briefcase' ? (
            <Briefcase className="w-6 h-6 text-white" />
          ) : (
            <Building2 className="w-6 h-6 text-white" />
          )}
        </div>

        <div className="flex-1">
          <h6
            className="text-lg font-semibold mb-2 transition-colors duration-300"
            style={{ color: '#133E87' }}
          >
            {title}
          </h6>
          <p
            className="mb-4 text-sm"
            style={{ color: '#608BC1' }}
          >
            {description}
          </p>

          <button
            className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group/button"
            style={{ color: '#133E87' }}
            onClick={() => handleClick(of)}
          >
            <span className="group-hover/button:text-[#608BC1]">Explore Opportunities</span>
            <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover/button:translate-x-1 group-hover/button:text-[#608BC1]" />
          </button>
        </div>
      </div>
    </div>
  );
}