import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faUsers, faProjectDiagram, faTools, faUserShield } from '@fortawesome/free-solid-svg-icons';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <FontAwesomeIcon icon={faSun} className="me-2" />
            SUNNYBOTICS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="justify-content-end">
            <Nav>
              <span className="navbar-text me-3">Bienvenido, {user?.username}</span>
              <Button variant="outline-light" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="flex-grow-1">
        <Row className="h-100">
          <Col md={2} className="bg-light p-3 border-end">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/clientes" className="mb-2">
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Clientes
              </Nav.Link>
              <Nav.Link as={Link} to="/proyectos" className="mb-2">
                <FontAwesomeIcon icon={faProjectDiagram} className="me-2" />
                Proyectos
              </Nav.Link>
              <Nav.Link as={Link} to="/cuadrillas" className="mb-2">
                <FontAwesomeIcon icon={faTools} className="me-2" />
                Cuadrillas
              </Nav.Link>
              <Nav.Link as={Link} to="/personal" className="mb-2">
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Personal
              </Nav.Link>
              {user?.role === 'admin' && (
                <Nav.Link as={Link} to="/roles" className="mb-2">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" />
                  Roles
                </Nav.Link>
              )}
            </Nav>
          </Col>
          <Col md={10} className="p-4">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;