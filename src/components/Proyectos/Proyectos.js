import React, { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faSolarPanel } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([
    {
      id: 1,
      nombre: 'Instalación Residencial Las Condes',
      cliente: 'Hernán Martínez',
      fechaInicio: '2023-03-15',
      fechaFin: '2023-04-20',
      estado: 'Completado',
      descripcion: 'Instalación de sistema solar de 5kW para residencia',
      presupuesto: 8500000,
      tipo: 'Instalación',
      prioridad: 'Media'
    },
    {
      id: 2,
      nombre: 'Mantención Hotel Sol del Pacífico',
      cliente: 'Hotel Sol del Pacífico',
      fechaInicio: '2023-05-10',
      fechaFin: '',
      estado: 'En progreso',
      descripcion: 'Mantención anual sistema de 50kW',
      presupuesto: 3500000,
      tipo: 'Mantención',
      prioridad: 'Alta'
    },
    {
      id: 3,
      nombre: 'Ampliación Planta AgroSolar',
      cliente: 'AgroSolar Ltda.',
      fechaInicio: '2023-06-01',
      fechaFin: '2023-08-30',
      estado: 'Pendiente',
      descripcion: 'Ampliación a sistema de 100kW',
      presupuesto: 25000000,
      tipo: 'Expansión',
      prioridad: 'Alta'
    },
    {
      id: 4,
      nombre: 'Reparación Sistema Clínica',
      cliente: 'Clínica Solar Salud',
      fechaInicio: '2023-04-05',
      fechaFin: '2023-04-07',
      estado: 'Completado',
      descripcion: 'Reparación de inversores dañados',
      presupuesto: 1200000,
      tipo: 'Reparación',
      prioridad: 'Urgente'
    },
    {
      id: 5,
      nombre: 'Instalación Comercial Solar Energy',
      cliente: 'Solar Energy Solutions',
      fechaInicio: '2023-07-15',
      fechaFin: '',
      estado: 'Planificación',
      descripcion: 'Nueva instalación comercial de 30kW',
      presupuesto: 15000000,
      tipo: 'Instalación',
      prioridad: 'Media'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentProyecto, setCurrentProyecto] = useState({
    id: null,
    nombre: '',
    cliente: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Pendiente',
    descripcion: '',
    presupuesto: 0,
    tipo: 'Instalación',
    prioridad: 'Media'
  });
  const [isEditing, setIsEditing] = useState(false);

  const estados = ['Pendiente', 'Planificación', 'En progreso', 'Completado', 'Cancelado'];
  const tiposProyecto = ['Instalación', 'Mantención', 'Reparación', 'Expansión', 'Auditoría'];
  const prioridades = ['Baja', 'Media', 'Alta', 'Urgente'];

  const handleShowModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setCurrentProyecto({
      id: null,
      nombre: '',
      cliente: '',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: '',
      estado: 'Pendiente',
      descripcion: '',
      presupuesto: 0,
      tipo: 'Instalación',
      prioridad: 'Media'
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProyectos(proyectos.map(proyecto => proyecto.id === currentProyecto.id ? currentProyecto : proyecto));
      Swal.fire('Actualizado!', 'Proyecto modificado correctamente.', 'success');
    } else {
      const newId = proyectos.length > 0 ? Math.max(...proyectos.map(p => p.id)) + 1 : 1;
      setProyectos([...proyectos, { ...currentProyecto, id: newId }]);
      Swal.fire('Agregado!', 'Nuevo proyecto registrado.', 'success');
    }
    handleCloseModal();
  };

  const handleEdit = (proyecto) => {
    setCurrentProyecto(proyecto);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar proyecto?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
        Swal.fire('Eliminado!', 'El proyecto ha sido eliminado.', 'success');
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProyecto({ ...currentProyecto, [name]: value });
  };

  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'Completado': return 'success';
      case 'En progreso': return 'primary';
      case 'Pendiente': return 'warning';
      case 'Cancelado': return 'danger';
      case 'Planificación': return 'info';
      default: return 'secondary';
    }
  };

  const getPrioridadBadge = (prioridad) => {
    switch(prioridad) {
      case 'Urgente': return 'danger';
      case 'Alta': return 'warning';
      case 'Media': return 'primary';
      case 'Baja': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>
          <FontAwesomeIcon icon={faSolarPanel} className="me-2" />
          Gestión de Proyectos
        </h2>
        <Button variant="primary" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nuevo Proyecto
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cliente</th>
            <th>Fechas</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Prioridad</th>
            <th>Presupuesto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto) => (
            <tr key={proyecto.id}>
              <td>{proyecto.id}</td>
              <td>{proyecto.nombre}</td>
              <td>{proyecto.cliente}</td>
              <td>
                <div>Inicio: {proyecto.fechaInicio}</div>
                <div>Fin: {proyecto.fechaFin || 'En curso'}</div>
              </td>
              <td>
                <Badge bg={getEstadoBadge(proyecto.estado)}>
                  {proyecto.estado}
                </Badge>
              </td>
              <td>{proyecto.tipo}</td>
              <td>
                <Badge bg={getPrioridadBadge(proyecto.prioridad)}>
                  {proyecto.prioridad}
                </Badge>
              </td>
              <td>${proyecto.presupuesto.toLocaleString('es-CL')}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(proyecto)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(proyecto.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Proyecto</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={currentProyecto.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="cliente"
                    value={currentProyecto.cliente}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha Inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={currentProyecto.fechaInicio}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha Fin (estimada)</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaFin"
                    value={currentProyecto.fechaFin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estado"
                    value={currentProyecto.estado}
                    onChange={handleInputChange}
                    required
                  >
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Proyecto</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={currentProyecto.tipo}
                    onChange={handleInputChange}
                    required
                  >
                    {tiposProyecto.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Prioridad</Form.Label>
                  <Form.Select
                    name="prioridad"
                    value={currentProyecto.prioridad}
                    onChange={handleInputChange}
                    required
                  >
                    {prioridades.map((prioridad) => (
                      <option key={prioridad} value={prioridad}>{prioridad}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={currentProyecto.descripcion}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Presupuesto ($)</Form.Label>
              <Form.Control
                type="number"
                name="presupuesto"
                value={currentProyecto.presupuesto}
                onChange={handleInputChange}
                min="0"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Guardar Cambios' : 'Crear Proyecto'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Proyectos;