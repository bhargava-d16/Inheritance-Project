// import React from 'react'

// const Footer = () => {
//   return (
//     <div className='footer'>
//       <p className='text-md text-center font-semibold'>© 2025 Job Portal. All rights reserved.</p>
//     </div>
//   )
// }

// export default Footer


import React from 'react';

const Footer = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f8f9fa', // Light gray background
        padding: '10px 0',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Shadow for visibility
        textAlign: 'center',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '600',
          color: '#133E87', // Dark blue text
        }}
      >
        © 2025 Job Portal. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
