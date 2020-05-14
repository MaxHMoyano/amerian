import React, { Fragment, useState, useEffect, createRef } from 'react';
import { Table, Button, Dropdown, Form } from 'react-bootstrap';
// import Select from "react-select";
// import { customValueContainer } from "../../../helpers/utilities";
import PositionDetail from './PositionDetail';
import { useSelector, useDispatch } from 'react-redux';
import { positionActions } from '../../../redux/actions';
import Select from 'react-select';
import PositionDelete from './PositionDelete';
import ListPagination from '../../../components/shared/ListPagination';

const PositionsList = () => {
  const dispatch = useDispatch();
  const currentHotel = useSelector(({ hotel }) => hotel.current);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPosition, setselectedPosition] = useState({});
  const [searchParams, setSearchParams] = useState({
    search: '',
    hotel: currentHotel ? currentHotel.id : null,
    limit: 10,
    offset: 0,
  });

  const hotelSelect = createRef();

  useEffect(() => {
    if (currentHotel) {
      hotelSelect.current.select.setValue({
        label: currentHotel.name,
        value: currentHotel.id,
      });
    }
  }, [currentHotel]);

  useEffect(() => {
    dispatch(positionActions.fetchPositions(searchParams.hotel, searchParams));
  }, [dispatch, searchParams]);

  // Selectors
  let positions = useSelector(({ position }) => position);
  let hotels = useSelector(({ hotel }) => hotel);

  const handleSearchChange = (e) => {
    if (e.key === 'Enter') {
      setSearchParams({ ...searchParams, search: e.target.value });
    }
  };

  const handlePositionEdit = (position) => {
    setselectedPosition(position);
    setShowModal(true);
  };

  const handlePositionDelete = (position) => {
    setselectedPosition(position);
    setShowDeleteModal(true);
  };

  return (
    <Fragment>
      <PositionDetail
        selected={selectedPosition}
        show={showModal}
        onCloseDialog={(e) => {
          setShowModal(false);
          setselectedPosition({});
        }}
      />
      <PositionDelete
        selected={selectedPosition}
        show={showDeleteModal}
        onClose={(e) => {
          setShowDeleteModal(false);
          setselectedPosition({});
        }}
      />
      <div className='d-flex mb-4 align-items-center'>
        <button
          type='button'
          onClick={(e) => setShowModal(true)}
          className='btn btn-secondary is_rounded mr-3'
        >
          Agregar Posición
        </button>
        <div className='icon_input search mx-2 w-15'>
          <Form.Control
            placeholder='Buscar...'
            onKeyPress={handleSearchChange}
          />
          <i className='fas fa-search'></i>
        </div>
        <Select
          className='w-15 mx-2'
          placeholder='Hotel'
          isClearable
          ref={hotelSelect}
          isLoading={hotels.pending}
          isDisabled={hotels.pending || currentHotel}
          options={hotels.results.map((e) => ({ label: e.name, value: e.id }))}
          onChange={(value) =>
            setSearchParams({
              ...searchParams,
              hotel: value ? value.value : null,
            })
          }
        />
      </div>
      {positions.pending ? (
        <div className='d-flex justify-content-center'>
          <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Hotel</th>
              <th>
                <Button variant='light' disabled>
                  <i className='fas fa-ellipsis-h'></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {positions.results.map((position) => (
              <tr className='table_link' key={position.id}>
                <td>{position.name}</td>
                <td>{position.description}</td>
                <td>{position.hotel}</td>
                <td>
                  <Dropdown drop='left'>
                    <Dropdown.Toggle variant='light'>
                      <i className='fas fa-ellipsis-h'></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as='button'
                        className='d-flex justify-content-between align-items-center'
                        onClick={(e) => handlePositionEdit(position)}
                      >
                        <span>Editar</span> <i className='fas fa-edit'></i>
                      </Dropdown.Item>
                      <Dropdown.Item
                        as='button'
                        className='d-flex justify-content-between align-items-center'
                        onClick={(e) => handlePositionDelete(position)}
                      >
                        <span>Eliminar</span> <i className='fas fa-trash'></i>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ListPagination
        limit={searchParams.limit}
        offset={searchParams.offset}
        count={positions.count}
        previous={positions.previous}
        next={positions.next}
        onPreviousPage={(e) =>
          setSearchParams({
            ...searchParams,
            offset: searchParams.offset - searchParams.limit,
          })
        }
        onNextPage={(e) =>
          setSearchParams({
            ...searchParams,
            offset: searchParams.offset + searchParams.limit,
          })
        }
      />
    </Fragment>
  );
};

export default PositionsList;
