import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



function Header() {
  return (
    <Navbar  id="nav" fixed="top"  data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Jobpply</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  href="#action1">Home</Nav.Link>
            <Nav.Link  href="#action2">About</Nav.Link>
            <NavDropdown  title="Sign Up" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Job seeker</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Employer
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Login" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action5">Job seeker</NavDropdown.Item>
              <NavDropdown.Item href="#action6">
                Employer
              </NavDropdown.Item>
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