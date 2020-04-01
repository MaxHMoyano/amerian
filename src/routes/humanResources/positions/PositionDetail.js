import React, { useEffect } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { hotelActions, positionActions } from '../../../redux/actions';
import { useFormik } from 'formik';
import * as Yup from "yup";

const PositionDetail = ({ show, onCloseDialog }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hotelActions.fetchHotels());
  }, [dispatch]);
  let hotels = useSelector(({ hotel }) => hotel);

  const positionSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    hotel: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).required("El hotel es requerido").nullable(),
    description: Yup.string()
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      hotel: null,
      description: ""
    },
    validationSchema: positionSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      let position = {
        ...values,
        hotel: values.hotel.value
      };
      dispatch(positionActions.createNewPosition(values.hotel.value, position)).then(() => {
        dispatch(positionActions.fetchPositions()).then(() => {
          setSubmitting(false);
          onCloseDialog();
          resetForm();
        });
      });
    }
  });



  return (
    <Modal show={show} onHide={onCloseDialog}>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Posicion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre de la posicion</Form.Label>
                <Form.Control
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.errors.name && formik.touched.name ? "is-invalid" : ""}
                />
                {formik.errors.name && formik.touched.name && <span className="error_message">{formik.errors.name}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Hotel</Form.Label>
                <Select
                  value={formik.values.hotel}
                  onChange={value => formik.setFieldValue("hotel", value)}
                  options={hotels.results.map((e) => ({ label: e.name, value: e.id }))}
                  isLoading={hotels.pending} />
                {formik.errors.hotel && formik.touched.hotel && <span className="error_message">{formik.errors.hotel}</span>}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              className={formik.errors.description && formik.touched.description ? "is-invalid" : ""}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="description"
              as="textarea" />
            {formik.errors.description && formik.touched.description && <span className="error_message">{formik.errors.description}</span>}
          </Form.Group>
          <Row>

          </Row>
        </Modal.Body>
        {
          !formik.isSubmitting ?
            <Modal.Footer>
              <Button onClick={onCloseDialog} variant="link">Cancelar</Button>
              <Button type="submit" variant="secondary">Agregar</Button>
            </Modal.Footer> :
            <Modal.Footer>
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </Modal.Footer>
        }
      </Form>
    </Modal>
  );
};

export default PositionDetail;
