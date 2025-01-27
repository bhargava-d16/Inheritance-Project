// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <Navbar id="nav" fixed="top" data-bs-theme="dark">
//       <Container fluid>
//         <Navbar.Brand>
//           <Link className='' to=''>Job Apply</Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             {/* Use Nav.Link with to prop, not Link inside Nav.Link */}
//             <Nav.Link as={Link} to='/'>Home</Nav.Link>
//             <Nav.Link as={Link} to='/about'>About</Nav.Link>
//             <NavDropdown title="Sign Up" id="navbarScrollingDropdown">
//               <NavDropdown.Item as={Link} to='/signup/jobseeker'>Job Seeker</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to='/signup/employeer'>Employer</NavDropdown.Item>
//             </NavDropdown>
//             <NavDropdown title="Login" id="navbarScrollingDropdown">
//               <NavDropdown.Item as={Link} to='/login/jobseeker'>Job Seeker</NavDropdown.Item>
//               <NavDropdown.Item as={Link} to='/login/employeer'>Employer</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-success">Search</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Header() {
  const navStyle = {
    backgroundColor: '#133E87',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  };

  const linkStyle = {
    color: '#FFFFFF',
    textDecoration: 'none',
    transition: 'opacity 0.2s ease-in-out',
  };

  return (
    <>
      <Navbar id="nav" fixed="top" expand="lg" style={navStyle} className="py-2">
        <Container fluid className="px-4">
          <Navbar.Brand id='spacing'>
            <Link to="/" style={{ ...linkStyle, fontSize: '1.5rem', fontWeight: 'bold',marginRight: '2rem',color: '#FFFFFF' }}>
              JobPortal
            </Link>
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="navbarScroll"
            className="border-0 shadow-none"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          
          <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="me-3 nav-link-hover"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className="me-3 nav-link-hover"
            >
              About
            </Nav.Link>
          </Nav>

            
            <Nav className="d-flex align-items-center gap-3">
            <div className="position-relative">
  <div className="dropdown-container">
    <Button
      variant="outline-light"
      className="d-flex align-items-center gap-1"
    >
      Register
      <i className="fas fa-chevron-down fs-6"></i>
    </Button>
    <div className="dropdown-menu-custom">
      <Link to="/register/jobseeker" className="dropdown-item-custom">
        <i className="fas fa-user-tie me-2"></i> Job Seeker
      </Link>
      <Link to="/register/employer" className="dropdown-item-custom">
        <i className="fas fa-building me-2"></i> Employer
      </Link>
    </div>
  </div>

  <div className="dropdown-container">
    <Button
      variant="light"
      className="d-flex align-items-center gap-1"
    >
      Login
      <i className="fas fa-chevron-down fs-6"></i>
    </Button>
    <div className="dropdown-menu-custom">
      <Link to="/login/jobseeker" className="dropdown-item-custom">
        <i className="fas fa-sign-in-alt me-2"></i> Job Seeker
      </Link>
      <Link to="/login/employer" className="dropdown-item-custom">
        <i className="fas fa-sign-in-alt me-2"></i> Employer
      </Link>
    </div>
  </div>
</div>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>
        {`   
            #spacing{
              margin-left : 7rem;
            }
            .navbar-brand {
                margin-right: 2rem;
              }
            .nav-link-hover {
              position: relative;
              color: #ffffff;
              text-decoration: none;
              margin-right: 2rem;
              transition: color 0.2s ease-in-out;
            }

            .nav-link-hover::after {
              content: "";
              position: absolute;
              bottom: 0; 
              left: 0;
              width: 0%; 
              height: 1px; 
              background-color: #ffffff;
              transition: width  ease-in-out; 
            }

            .nav-link-hover:hover::after {
              width: 100%; 
            }

            .dropdown-container {
              position: relative;
              display: inline-block;
              margin-right: 1rem; 
            }

            .dropdown-menu-custom {
              display: none; 
              position: absolute;
              top: 100%; 
              right: 0; 
              min-width: 200px; 
              padding: 0.25rem 0; 
              background-color: #ffffff; 
              border: 1px solid #e0e0e0; 
              border-radius: 0.5rem; 
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
              opacity: 1 !important; 
              visibility: visible !important; 
              transform: translateY(0); 
              z-index: 1000; 
            }

            .dropdown-container:hover .dropdown-menu-custom {
              display: block; 
            }

            .dropdown-item-custom {
              display: flex;
              align-items: center;
              padding: 0.75rem 1.5rem;
              color: #133E87 !important; 
              font-size: 1rem; 
              font-weight: 500; 
              font-family: 'Arial', sans-serif;
              text-decoration: none; 
              transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
          }

          .dropdown-item-custom:hover {
            background-color: #f8f9fa; 
            color: #0d2b5e !important; 
          }

          .dropdown-item-custom:not(:last-child) {
            border-bottom: 1px solid #f0f0f0; 
          }
        `}
      </style>
    </>
  );
}

export default Header;