import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Clientes = () => {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: 'Solar Energy Solutions',
      email: 'contacto@solar-energy.com',
      telefono: '+56912345678',
      direccion: 'Av. Los Aromos 1234, Santiago',
      tipo: 'Empresa',
      fechaRegistro: '2023-01-15'
    },
    {
      id: 2,
      nombre: 'Hernán Martínez',
      email: 'hernan.martinez@mail.com',
      telefono: '+56987654321',
      direccion: 'Calle Los Pinos 45, Viña del Mar',
      tipo: 'Residencial',
      fechaRegistro: '2023-02-10'
    },
    {
      id: 3,
      nombre: 'Hotel Sol del Pacífico',
      email: 'reservas@soldelpacifico.cl',
      telefono: '+56223456789',
      direccion: 'Costanera 2450, Antofagasta',
      tipo: 'Comercial',
      fechaRegistro: '2023-03-05'
    },
    {
      id: 4,
      nombre: 'AgroSolar Ltda.',
      email: 'ventas@agrosolar.cl',
      telefono: '+56234567890',
      direccion: 'Ruta 5 Norte KM 45, La Serena',
      tipo: 'Agroindustrial',
      fechaRegistro: '2023-04-20'
    },
    {
      id: 5,
      nombre: 'Clínica Solar Salud',
      email: 'administracion@clinicasolar.cl',
      telefono: '+56998765432',
      direccion: 'Av. San Martín 678, Concepción',
      tipo: 'Institucional',
      fechaRegistro: '2023-05-12'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({ 
    id: null, 
    nombre: '', 
    email: '', 
    telefono: '',
    direccion: '',
    tipo: 'Residencial',
    fechaRegistro: new Date().toISOString().split('T')[0]
  });
  const [isEditing, setIsEditing] = useState(false);

  const tiposCliente = ['Residencial', 'Comercial', 'Empresa', 'Agroindustrial', 'Institucional'];

  const handleShowModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setCurrentCliente({ 
      id: null, 
      nombre: '', 
      email: '', 
      telefono: '',
      direccion: '',
      tipo: 'Residencial',
      fechaRegistro: new Date().toISOString().split('T')[0]
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setClientes(clientes.map(cliente => cliente.id === currentCliente.id ? currentCliente : cliente));
      Swal.fire('Actualizado!', 'Cliente modificado correctamente.', 'success');
    } else {
      const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
      setClientes([...clientes, { ...currentCliente, id: newId }]);
      Swal.fire('Agregado!', 'Nuevo cliente registrado.', 'success');
    }
    handleCloseModal();
  };

  const handleEdit = (cliente) => {
    setCurrentCliente(cliente);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar cliente?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setClientes(clientes.filter(cliente => cliente.id !== id));
        Swal.fire('Eliminado!', 'El cliente ha sido eliminado.', 'success');
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCliente({ ...currentCliente, [name]: value });
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Gestión de Clientes</h2>
        <Button variant="primary" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nuevo Cliente
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Tipo</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.tipo}</td>
              <td>{cliente.fechaRegistro}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(cliente)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(cliente.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={currentCliente.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentCliente.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={currentCliente.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Cliente</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={currentCliente.tipo}
                    onChange={handleInputChange}
                    required
                  >
                    {tiposCliente.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="direccion"
                value={currentCliente.direccion}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Registro</Form.Label>
              <Form.Control
                type="date"
                name="fechaRegistro"
                value={currentCliente.fechaRegistro}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Guardar Cambios' : 'Registrar Cliente'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Clientes;