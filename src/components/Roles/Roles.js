import React, { useState } from 'react';
import { Table, Button, Modal, Form, Badge, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faUserShield, faKey } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Roles = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      nombre: 'Administrador',
      descripcion: 'Acceso completo al sistema',
      permisos: [
        'Gestionar todo',
        'Configurar sistema',
        'Generar reportes',
        'Aprobar presupuestos',
        'Administrar usuarios'
      ],
      nivelAcceso: 10
    },
    {
      id: 2,
      nombre: 'Supervisor',
      descripcion: 'Gestiona proyectos y personal',
      permisos: [
        'Gestionar proyectos',
        'Asignar cuadrillas',
        'Ver reportes',
        'Gestionar personal'
      ],
      nivelAcceso: 7
    },
    {
      id: 3,
      nombre: 'Técnico',
      descripcion: 'Acceso limitado a funciones técnicas',
      permisos: [
        'Ver proyectos asignados',
        'Registrar avances',
        'Reportar incidencias'
      ],
      nivelAcceso: 4
    },
    {
      id: 4,
      nombre: 'Cliente',
      descripcion: 'Acceso a portal de clientes',
      permisos: [
        'Ver proyectos propios',
        'Solicitar servicios',
        'Ver facturas'
      ],
      nivelAcceso: 2
    },
    {
      id: 5,
      nombre: 'Consulta',
      descripcion: 'Solo lectura',
      permisos: [
        'Ver reportes',
        'Ver estadísticas'
      ],
      nivelAcceso: 1
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentRol, setCurrentRol] = useState({
    id: null,
    nombre: '',
    descripcion: '',
    permisos: [],
    nivelAcceso: 1
  });
  const [isEditing, setIsEditing] = useState(false);
  const [nuevoPermiso, setNuevoPermiso] = useState('');

  const permisosDisponibles = [
    'Gestionar todo',
    'Configurar sistema',
    'Generar reportes',
    'Aprobar presupuestos',
    'Administrar usuarios',
    'Gestionar proyectos',
    'Asignar cuadrillas',
    'Ver reportes',
    'Gestionar personal',
    'Ver proyectos asignados',
    'Registrar avances',
    'Reportar incidencias',
    'Ver proyectos propios',
    'Solicitar servicios',
    'Ver facturas',
    'Ver estadísticas'
  ];

  const nivelesAcceso = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleShowModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setCurrentRol({
      id: null,
      nombre: '',
      descripcion: '',
      permisos: [],
      nivelAcceso: 1
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddPermiso = () => {
    if (nuevoPermiso.trim() !== '' && !currentRol.permisos.includes(nuevoPermiso)) {
      setCurrentRol({
        ...currentRol,
        permisos: [...currentRol.permisos, nuevoPermiso]
      });
      setNuevoPermiso('');
    }
  };

  const handleRemovePermiso = (permiso) => {
    setCurrentRol({
      ...currentRol,
      permisos: currentRol.permisos.filter(p => p !== permiso)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentRol.permisos.length === 0) {
      Swal.fire('Error', 'Debe asignar al menos un permiso', 'error');
      return;
    }

    if (isEditing) {
      setRoles(roles.map(rol => rol.id === currentRol.id ? currentRol : rol));
      Swal.fire('Actualizado!', 'Rol modificado correctamente.', 'success');
    } else {
      const newId = roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1;
      setRoles([...roles, { ...currentRol, id: newId }]);
      Swal.fire('Agregado!', 'Nuevo rol registrado.', 'success');
    }
    handleCloseModal();
  };

  const handleEdit = (rol) => {
    setCurrentRol(rol);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (id === 1) {
      Swal.fire('Error', 'No se puede eliminar el rol Administrador', 'error');
      return;
    }
    Swal.fire({
      title: '¿Eliminar rol?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setRoles(roles.filter(rol => rol.id !== id));
        Swal.fire('Eliminado!', 'El rol ha sido eliminado.', 'success');
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRol({ ...currentRol, [name]: value });
  };

  const getNivelAccesoBadge = (nivel) => {
    if (nivel >= 8) return 'danger';
    if (nivel >= 5) return 'warning';
    if (nivel >= 3) return 'primary';
    return 'success';
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>
          <FontAwesomeIcon icon={faUserShield} className="me-2" />
          Gestión de Roles
        </h2>
        <Button variant="primary" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nuevo Rol
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Permisos</th>
            <th>Nivel Acceso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id}>
              <td>{rol.id}</td>
              <td>{rol.nombre}</td>
              <td>{rol.descripcion}</td>
              <td>
                {rol.permisos.slice(0, 3).map((permiso, index) => (
                  <Badge key={index} bg="info" className="me-1 mb-1">
                    {permiso}
                  </Badge>
                ))}
                {rol.permisos.length > 3 && (
                  <Badge bg="secondary" className="me-1 mb-1">
                    +{rol.permisos.length - 3} más
                  </Badge>
                )}
              </td>
              <td>
                <Badge bg={getNivelAccesoBadge(rol.nivelAcceso)}>
                  Nivel {rol.nivelAcceso}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2" 
                  onClick={() => handleEdit(rol)}
                  disabled={rol.id === 1}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(rol.id)}
                  disabled={rol.id === 1}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Rol' : 'Nuevo Rol'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Rol</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={currentRol.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nivel de Acceso</Form.Label>
                  <Form.Select
                    name="nivelAcceso"
                    value={currentRol.nivelAcceso}
                    onChange={handleInputChange}
                    required
                  >
                    {nivelesAcceso.map((nivel) => (
                      <option key={nivel} value={nivel}>Nivel {nivel}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="descripcion"
                value={currentRol.descripcion}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permisos</Form.Label>
              <InputGroup className="mb-3">
                <Form.Select
                  value={nuevoPermiso}
                  onChange={(e) => setNuevoPermiso(e.target.value)}
                >
                  <option value="">Seleccione un permiso</option>
                  {permisosDisponibles.map((permiso) => (
                    <option 
                      key={permiso} 
                      value={permiso}
                      disabled={currentRol.permisos.includes(permiso)}
                    >
                      {permiso}
                    </option>
                  ))}
                </Form.Select>
                <Button variant="success" onClick={handleAddPermiso}>
                  <FontAwesomeIcon icon={faKey} /> Agregar
                </Button>
              </InputGroup>
              <div className="d-flex flex-wrap">
                {currentRol.permisos.map((permiso, index) => (
                  <Badge key={index} bg="primary" className="me-1 mb-1 d-flex align-items-center">
                    {permiso}
                    <Button
                      variant="link"
                      className="text-white p-0 ms-1"
                      onClick={() => handleRemovePermiso(permiso)}
                    >
                      ×
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
              {isEditing ? 'Guardar Cambios' : 'Crear Rol'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Roles;