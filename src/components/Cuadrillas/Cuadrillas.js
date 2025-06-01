import React, { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUsers, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Cuadrillas = () => {
  const [cuadrillas, setCuadrillas] = useState([
    {
      id: 1,
      nombre: 'Equipo Alpha',
      especialidad: 'Instalación',
      miembros: ['Juan Pérez', 'Carlos Rojas', 'Ana Soto'],
      proyectoAsignado: 'Instalación Residencial Las Condes',
      supervisor: 'Luis Méndez',
      vehiculo: 'Camioneta F-350',
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'Equipo Beta',
      especialidad: 'Mantenimiento',
      miembros: ['Pedro González', 'María Fernández'],
      proyectoAsignado: 'Mantención Hotel Sol del Pacífico',
      supervisor: 'Laura Jiménez',
      vehiculo: 'Camioneta Ranger',
      estado: 'Activo'
    },
    {
      id: 3,
      nombre: 'Equipo Gamma',
      especialidad: 'Reparación',
      miembros: ['Diego Silva', 'Camila Vargas'],
      proyectoAsignado: 'Reparación Sistema Clínica',
      supervisor: 'Ricardo Morales',
      vehiculo: 'Camioneta Hilux',
      estado: 'Activo'
    },
    {
      id: 4,
      nombre: 'Equipo Delta',
      especialidad: 'Instalación',
      miembros: ['Andrés Castro', 'Fernanda López', 'Jorge Muñoz'],
      proyectoAsignado: 'Instalación Comercial Solar Energy',
      supervisor: 'Patricia Soto',
      vehiculo: 'Camioneta Amarok',
      estado: 'Activo'
    },
    {
      id: 5,
      nombre: 'Equipo Emergencias',
      especialidad: 'Reparación',
      miembros: ['Sergio Contreras', 'Valentina Díaz'],
      proyectoAsignado: '',
      supervisor: 'Ricardo Morales',
      vehiculo: 'Camioneta Hilux',
      estado: 'Disponible'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentCuadrilla, setCurrentCuadrilla] = useState({
    id: null,
    nombre: '',
    especialidad: '',
    miembros: [],
    proyectoAsignado: '',
    supervisor: '',
    vehiculo: '',
    estado: 'Activo'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [nuevoMiembro, setNuevoMiembro] = useState('');

  const especialidades = ['Instalación', 'Mantenimiento', 'Reparación', 'Inspección', 'Auditoría'];
  const estados = ['Activo', 'Inactivo', 'Disponible', 'En vacaciones'];

  const handleShowModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setCurrentCuadrilla({
      id: null,
      nombre: '',
      especialidad: '',
      miembros: [],
      proyectoAsignado: '',
      supervisor: '',
      vehiculo: '',
      estado: 'Activo'
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddMiembro = () => {
    if (nuevoMiembro.trim() !== '' && !currentCuadrilla.miembros.includes(nuevoMiembro)) {
      setCurrentCuadrilla({
        ...currentCuadrilla,
        miembros: [...currentCuadrilla.miembros, nuevoMiembro]
      });
      setNuevoMiembro('');
    }
  };

  const handleRemoveMiembro = (miembro) => {
    setCurrentCuadrilla({
      ...currentCuadrilla,
      miembros: currentCuadrilla.miembros.filter(m => m !== miembro)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCuadrilla.miembros.length === 0) {
      Swal.fire('Error', 'La cuadrilla debe tener al menos un miembro', 'error');
      return;
    }

    if (isEditing) {
      setCuadrillas(cuadrillas.map(cuadrilla => cuadrilla.id === currentCuadrilla.id ? currentCuadrilla : cuadrilla));
      Swal.fire('Actualizado!', 'Cuadrilla modificada correctamente.', 'success');
    } else {
      const newId = cuadrillas.length > 0 ? Math.max(...cuadrillas.map(c => c.id)) + 1 : 1;
      setCuadrillas([...cuadrillas, { ...currentCuadrilla, id: newId }]);
      Swal.fire('Agregado!', 'Nueva cuadrilla registrada.', 'success');
    }
    handleCloseModal();
  };

  const handleEdit = (cuadrilla) => {
    setCurrentCuadrilla(cuadrilla);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar cuadrilla?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setCuadrillas(cuadrillas.filter(cuadrilla => cuadrilla.id !== id));
        Swal.fire('Eliminado!', 'La cuadrilla ha sido eliminada.', 'success');
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCuadrilla({ ...currentCuadrilla, [name]: value });
  };

  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'Activo': return 'success';
      case 'Inactivo': return 'secondary';
      case 'Disponible': return 'info';
      case 'En vacaciones': return 'warning';
      default: return 'light';
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>
          <FontAwesomeIcon icon={faUsers} className="me-2" />
          Gestión de Cuadrillas
        </h2>
        <Button variant="primary" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nueva Cuadrilla
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Miembros</th>
            <th>Proyecto</th>
            <th>Supervisor</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuadrillas.map((cuadrilla) => (
            <tr key={cuadrilla.id}>
              <td>{cuadrilla.id}</td>
              <td>{cuadrilla.nombre}</td>
              <td>{cuadrilla.especialidad}</td>
              <td>
                {cuadrilla.miembros.map((miembro, index) => (
                  <Badge key={index} bg="info" className="me-1 mb-1">
                    {miembro}
                  </Badge>
                ))}
              </td>
              <td>{cuadrilla.proyectoAsignado || 'Sin asignar'}</td>
              <td>{cuadrilla.supervisor}</td>
              <td>
                <Badge bg={getEstadoBadge(cuadrilla.estado)}>
                  {cuadrilla.estado}
                </Badge>
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(cuadrilla)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(cuadrilla.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Cuadrilla' : 'Nueva Cuadrilla'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Cuadrilla</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={currentCuadrilla.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select
                    name="especialidad"
                    value={currentCuadrilla.especialidad}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione una especialidad</option>
                    {especialidades.map((especialidad) => (
                      <option key={especialidad} value={especialidad}>{especialidad}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Supervisor</Form.Label>
                  <Form.Control
                    type="text"
                    name="supervisor"
                    value={currentCuadrilla.supervisor}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vehículo</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehiculo"
                    value={currentCuadrilla.vehiculo}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="estado"
                value={currentCuadrilla.estado}
                onChange={handleInputChange}
                required
              >
                {estados.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Proyecto Asignado</Form.Label>
              <Form.Control
                type="text"
                name="proyectoAsignado"
                value={currentCuadrilla.proyectoAsignado}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Miembros</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={nuevoMiembro}
                  onChange={(e) => setNuevoMiembro(e.target.value)}
                  placeholder="Nombre del miembro"
                />
                <Button variant="success" onClick={handleAddMiembro}>
                  <FontAwesomeIcon icon={faUserPlus} /> Agregar
                </Button>
              </InputGroup>
              <div className="d-flex flex-wrap">
                {currentCuadrilla.miembros.map((miembro, index) => (
                  <Badge key={index} bg="primary" className="me-1 mb-1 d-flex align-items-center">
                    {miembro}
                    <Button
                      variant="link"
                      className="text-white p-0 ms-1"
                      onClick={() => handleRemoveMiembro(miembro)}
                    >
                      <FontAwesomeIcon icon={faUserMinus} />
                    </Button>
                  </Badge>
                ))}
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Guardar Cambios' : 'Crear Cuadrilla'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Cuadrillas;