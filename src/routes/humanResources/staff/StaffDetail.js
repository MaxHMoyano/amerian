import React from "react";
import { Button, Image, Row, Col, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const StaffDetail = () => {
  const history = useHistory();


  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center mb-3">
        <Button onClick={() => history.goBack()} className="mr-2" variant="light"><i className="fas fa-chevron-left"></i></Button>
        <h2 className="mb-0">Nombre del staff</h2>

      </div>
      <div className="d-flex mb-4">
        <Button variant="secondary">Editar Perfil</Button>

      </div>
      <div className="staff_detail_container py-2">
        <div className="general_info">
          <h4 className="section_title">Informacion General</h4>
          <div className="content px-5">
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>

          </div>
        </div>
        <div className="work_info">
          <h4 className="section_title">Informacion Laboral</h4>
          <div className="content px-5">
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>

          </div>
        </div>
        <div className="contact_info">
          <h4 className="section_title">Informacion de Contacto</h4>
          <div className="content px-5">
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>

          </div>
        </div>
        <div className="address">
          <h4 className="section_title">Direción</h4>
          <div className="content px-5">
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">Nombre</Col>
              <Col md="6">
                <Form.Control placeholder="Nombre" />
              </Col>
            </Row>

          </div>
        </div>
        <div className="summary">
          <h4 className="section_title">Beatriz Roca</h4>
          <div className="d-flex mb-4">
            <Image
              src="https://source.unsplash.com/featured/?{nature}"
              width="150"
              height="150"
            />
          </div>
          <div className="d-flex flex-column">
            <div className="mb-2 d-flex flex-column">
              <span>Email empresarial</span>
              <span className="text-muted">broca@amerian.com</span>
            </div>
            <div className="mb-2 d-flex flex-column">
              <span>Email empresarial</span>
              <span className="text-muted">broca@amerian.com</span>

            </div>
            <div className="mb-2 d-flex flex-column">
              <span>Email empresarial</span>
              <span className="text-muted">broca@amerian.com</span>

            </div>
            <div className="mb-2 d-flex flex-column">
              <span>Email empresarial</span>
              <span className="text-muted">broca@amerian.com</span>

            </div>
            <div className="mb-2 d-flex flex-column">
              <span>Email empresarial</span>
              <span className="text-muted">broca@amerian.com</span>

            </div>
            <div className="mb-2 d-flex flex-column">
              <span>Email empresarial</span>
              <span className="text-muted">broca@amerian.com</span>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffDetail;
