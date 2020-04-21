import React, { useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import Select from 'react-select';
import { useSelector, useDispatch } from "react-redux";
import { positionActions, staffActions, hotelActions } from "../../../redux/actions/";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { phoneRegex } from "../../../helpers/utilities";
import _ from "lodash";

const StaffModal = ({ show, onClose, selected }) => {
  const dispatch = useDispatch();


  const staffSchema = Yup.object().shape({
    first_name: Yup.string().required("El nombre es requerido"),
    last_name: Yup.string().required("El apellido es requerido"),
    hotel: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).required("El hotel es requerido").nullable(),
    position: Yup.object().shape({ label: Yup.string().required(), value: Yup.string().required() }).required("La posicion es requerida").nullable(),
    email: Yup.string().email("Email invalido").required("El email es requerido"),
    phone: Yup.string().matches(phoneRegex, "Telefono invalido").required("El telefono es requerido")
  });

  useEffect(() => {
    if (!_.isEmpty(selected)) {
      dispatch(staffActions.fetchStaffById(selected.hotel.id, selected.id)).then((staff) => {
        Promise.all([dispatch(hotelActions.fetchHotel(staff.hotel)), dispatch(positionActions.fetchPosition(staff.position))]).then(([hotel, position]) => {
          formik.setValues({
            first_name: staff.first_name,
            last_name: staff.last_name,
            hotel: {
              label: hotel.name,
              value: hotel.id
            },
            position: {
              label: position.name,
              value: position.id
            },
            email: staff.email,
            phone: staff.phone,
          });
        });
      });
    }
  }, [selected, dispatch]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      hotel: null,
      position: null,
      email: "",
      phone: "",
    },
    validationSchema: staffSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      let staff = {
        ...values,
        position: values.position.value,
      };

      if (!_.isEmpty(selected)) {
        dispatch(staffActions.updateStaff(values.hotel.value, selected.id, staff)).then(() => {
          dispatch(staffActions.fetchStaff()).then(() => {
            setSubmitting(false);
            onClose();
            resetForm();
            dispatch(positionActions.cleanState());
          });
        });
      } else {
        dispatch(staffActions.createNewStaff(values.hotel.value, staff)).then(() => {
          dispatch(staffActions.fetchStaff()).then(() => {
            setSubmitting(false);
            onClose();
            resetForm();
            dispatch(positionActions.cleanState());
          });
        });

      }
    }
  });

  const handleHotelChange = (value) => {
    formik.setFieldValue("hotel", value);
    dispatch(positionActions.fetchPositions(value.value));
  };


  let hotels = useSelector(({ hotel }) => hotel);
  let positions = useSelector(({ position }) => position);

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>
                  Nombres <span className="text-primary">*</span>
                </Form.Label>
                <Form.Control
                  className={formik.errors.first_name && formik.touched.first_name ? "is-invalid" : ""}
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="first_name"
                  type="text"
                />
                {formik.errors.first_name && formik.touched.first_name && <span className="error_message">{formik.errors.first_name}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>
                  Apellidos <span className="text-primary">*</span>
                </Form.Label>
                <Form.Control
                  className={formik.errors.last_name && formik.touched.last_name ? "is-invalid" : ""}
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="last_name"
                  type="text" />
                {formik.errors.last_name && formik.touched.last_name && <span className="error_message">{formik.errors.last_name}</span>}
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Hotel</Form.Label>
                <Select
                  isLoading={hotels.pending}
                  onChange={handleHotelChange}
                  value={formik.values.hotel}
                  options={hotels.results.map(e => ({ label: e.name, value: e.id }))}
                />
                {formik.errors.hotel && formik.touched.hotel && <span className="error_message">{formik.errors.hotel}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Posicion</Form.Label>
                <Select
                  isDisabled={!positions.results.length}
                  isLoading={positions.pending}
                  onChange={value => formik.setFieldValue("position", value)}
                  value={formik.values.position}
                  options={positions.results.map(e => ({ label: e.name, value: e.id }))} />
                {formik.errors.position && formik.touched.position && <span className="error_message">{formik.errors.position}</span>}
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={formik.errors.email && formik.touched.email ? "is-invalid" : ""}
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email" />
                {formik.errors.email && formik.touched.email && <span className="error_message">{formik.errors.email}</span>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  className={formik.errors.phone && formik.touched.phone ? "is-invalid" : ""}
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone" />
                {formik.errors.phone && formik.touched.phone && <span className="error_message">{formik.errors.phone}</span>}
              </Form.Group>
            </Col>
          </Form.Row>
        </Modal.Body>
        {
          !formik.isSubmitting ?
            <Modal.Footer>
              <Button variant="light" onClick={e => { onClose(); formik.resetForm(); }}> Cancelar</Button>
              <Button type="submit" variant="secondary">Guardar</Button>
            </Modal.Footer> :
            <Modal.Footer>
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </Modal.Footer>
        }
      </Form>
    </Modal>
  );
};

export default StaffModal;
