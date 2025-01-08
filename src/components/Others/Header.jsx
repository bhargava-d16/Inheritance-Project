import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar id="nav" fixed="top" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link className='' to=''>Job Apply</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* Use Nav.Link with to prop, not Link inside Nav.Link */}
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
            <NavDropdown title="Sign Up" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to='/signup/jobseeker'>Job Seeker</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/signup/employeer'>Employer</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Login" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to='/login/jobseeker'>Job Seeker</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/login/employeer'>Employer</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
