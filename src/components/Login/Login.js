import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import sunLogo from '../../assets/sun-logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      Swal.fire('¡Bienvenido!', 'Inicio de sesión exitoso', 'success');
      navigate('/');
    } else {
      Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }} className="shadow">
        <Card.Body>
          <div className="text-center mb-4">
            <img src={sunLogo} alt="Logo" style={{ width: '100px' }} />
            <h3 className="mt-3">SUNNYBOTICS</h3>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;