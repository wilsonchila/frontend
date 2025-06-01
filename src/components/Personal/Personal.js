import React, { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUser, faIdCard } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Personal = () => {
  const [personal, setPersonal] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      rut: '12.345.678-9',
      telefono: '+56912345678',
      email: 'juan.perez@sunnybotics.cl',
      especialidad: 'Instalador Senior',
      fechaContratacion: '2021-03-15',
      salario: 1200000,
      contactoEmergencia: 'María Pérez - +56987654321',
      estado: 'Activo',
      tipoContrato: 'Indefinido'
    },
    {
      id: 2,
      nombre: 'Carlos Rojas',
      rut: '23.456.789-0',
      telefono: '+56923456789',
      email: 'carlos.rojas@sunnybotics.cl',
      especialidad: 'Técnico Electricista',
      fechaContratacion: '2022-01-10',
      salario: 950000,
      contactoEmergencia: 'Sofía Rojas - +56976543210',
      estado: 'Activo',
      tipoContrato: 'Indefinido'
    },
    {
      id: 3,
      nombre: 'Ana Soto',
      rut: '34.567.890-1',
      telefono: '+56934567890',
      email: 'ana.soto@sunnybotics.cl',
      especialidad: 'Instaladora Junior',
      fechaContratacion: '2022-11-05',
      salario: 850000,
      contactoEmergencia: 'Roberto Soto - +56965432109',
      estado: 'Activo',
      tipoContrato: 'Plazo fijo'
    },
    {
      id: 4,
      nombre: 'Pedro González',
      rut: '45.678.901-2',
      telefono: '+56945678901',
      email: 'pedro.gonzalez@sunnybotics.cl',
      especialidad: 'Supervisor de Obras',
      fechaContratacion: '2020-08-20',
      salario: 1500000,
      contactoEmergencia: 'Laura González - +56954321098',
      estado: 'Activo',
      tipoContrato: 'Indefinido'
    },
    {
      id: 5,
      nombre: 'María Fernández',
      rut: '56.789.012-3',
      telefono: '+56956789012',
      email: 'maria.fernandez@sunnybotics.cl',
      especialidad: 'Técnica en Mantención',
      fechaContratacion: '2023-02-28',
      salario: 900000,
      contactoEmergencia: 'José Fernández - +56943210987',
      estado: 'Prueba',
      tipoContrato: 'Plazo fijo'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentPersona, setCurrentPersona] = useState({
    id: null,
    nombre: '',
    rut: '',
    telefono: '',
    email: '',
    especialidad: '',
    fechaContratacion: '',
    salario: 0,
    contactoEmergencia: '',
    estado: 'Activo',
    tipoContrato: 'Indefinido'
  });
  const [isEditing, setIsEditing] = useState(false);

  const especialidades = [
    'Instalador Senior',
    'Instalador Junior',
    'Técnico Electricista',
    'Supervisor de Obras',
    'Técnico en Mantención',
    'Ingeniero de Proyectos'
  ];
  const estados = ['Activo', 'Inactivo', 'Vacaciones', 'Prueba', 'Licencia'];
  const tiposContrato = ['Indefinido', 'Plazo fijo', 'Honorarios', 'Part-time'];

  const handleShowModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setCurrentPersona({
      id: null,
      nombre: '',
      rut: '',
      telefono: '',
      email: '',
      especialidad: '',
      fechaContratacion: new Date().toISOString().split('T')[0],
      salario: 0,
      contactoEmergencia: '',
      estado: 'Activo',
      tipoContrato: 'Indefinido'
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPersonal(personal.map(persona => persona.id === currentPersona.id ? currentPersona : persona));
      Swal.fire('Actualizado!', 'Personal modificado correctamente.', 'success');
    } else {
      const newId = personal.length > 0 ? Math.max(...personal.map(p => p.id)) + 1 : 1;
      setPersonal([...personal, { ...currentPersona, id: newId }]);
      Swal.fire('Agregado!', 'Nuevo personal registrado.', 'success');
    }
    handleCloseModal();
  };

  const handleEdit = (persona) => {
    setCurrentPersona(persona);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar personal?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setPersonal(personal.filter(persona => persona.id !== id));
        Swal.fire('Eliminado!', 'El personal ha sido eliminado.', 'success');
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPersona({ ...currentPersona, [name]: value });
  };

  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'Activo': return 'success';
      case 'Inactivo': return 'secondary';
      case 'Vacaciones': return 'info';
      case 'Prueba': return 'warning';
      case 'Licencia': return 'primary';
      default: return 'light';
    }
  };

  const formatSalario = (salario) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(salario);
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Gestión de Personal
        </h2>
        <Button variant="primary" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nuevo Personal
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Especialidad</th>
            <th>Contacto</th>
            <th>Contrato</th>
            <th>Salario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personal.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.id}</td>
              <td>{persona.nombre}</td>
              <td>{persona.rut}</td>
              <td>{persona.especialidad}</td>
              <td>
                <div>{persona.telefono}</div>
                <div className="small text-muted">{persona.email}</div>
              </td>
              <td>{persona.tipoContrato}</td>
              <td>{formatSalario(persona.salario)}</td>
              <td>
                <Badge bg={getEstadoBadge(persona.estado)}>
                  {persona.estado}
                </Badge>
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(persona)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(persona.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Personal' : 'Nuevo Personal'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={currentPersona.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>RUT</Form.Label>
                  <Form.Control
                    type="text"
                    name="rut"
                    value={currentPersona.rut}
                    onChange={handleInputChange}
                    placeholder="12.345.678-9"
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
                    value={currentPersona.telefono}
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
                    value={currentPersona.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select
                    name="especialidad"
                    value={currentPersona.especialidad}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione especialidad</option>
                    {especialidades.map((especialidad) => (
                      <option key={especialidad} value={especialidad}>{especialidad}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Contrato</Form.Label>
                  <Form.Select
                    name="tipoContrato"
                    value={currentPersona.tipoContrato}
                    onChange={handleInputChange}
                    required
                  >
                    {tiposContrato.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Contratación</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaContratacion"
                    value={currentPersona.fechaContratacion}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salario ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="salario"
                    value={currentPersona.salario}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Contacto de Emergencia</Form.Label>
              <Form.Control
                type="text"
                name="contactoEmergencia"
                value={currentPersona.contactoEmergencia}
                onChange={handleInputChange}
                placeholder="Nombre - Teléfono"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="estado"
                value={currentPersona.estado}
                onChange={handleInputChange}
                required
              >
                {estados.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Guardar Cambios' : 'Registrar Personal'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Personal;