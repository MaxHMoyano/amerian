import React, { Fragment, useState } from 'react';
import { Table, Badge, Button, Dropdown, Form } from 'react-bootstrap';
import Select from 'react-select';
import StaffModal from './NewStaff';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  staffActions,
  hotelActions,
  positionActions,
} from '../../../redux/actions/';
import DeleteStaff from './DeleteStaff';
import ListPagination from '../../../components/shared/ListPagination';

const Staff = () => {
  // const history = useHistory();
  // const location = useLocation();
  const dispatch = useDispatch();

  let staff = useSelector(({ staff }) => staff);
  let hotels = useSelector(({ hotel }) => hotel);
  let positions = useSelector(({ position }) => position);
  const currentHotel = useSelector(({ hotel }) => hotel.current);

  const [showModal, setshowModal] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [searchParams, setSearchParams] = useState({
    search: '',
    hotel: currentHotel ? currentHotel.id : null,
    position: null,
    limit: 10,
    offset: 0,
  });

  const hotelSelect = React.createRef();

  useEffect(() => {
    fetchResource();
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(hotelActions.fetchHotels());
    dispatch(positionActions.fetchPositions());
  }, [dispatch]);

  useEffect(() => {
    if (currentHotel) {
      hotelSelect.current.select.setValue({
        label: currentHotel.name,
        value: currentHotel.id,
      });
    }
  }, [currentHotel]);

  // Utility functions

  const fetchResource = () => {
    dispatch(staffActions.fetchStaff(searchParams));
  };

  const handleSearchChange = (e) => {
    if (e.key === 'Enter') {
      setSearchParams({ ...searchParams, search: e.target.value });
    }
  };

  const handleEditStaff = (staff) => {
    setSelectedStaff(staff);
    setshowModal(true);
  };

  const handleDeleteStaff = (staff) => {
    setSelectedStaff(staff);
    setshowDeleteModal(true);
  };

  return (
    <Fragment>
      <StaffModal
        selected={selectedStaff}
        onClose={() => {
          setshowModal(false);
          setSelectedStaff({});
        }}
        show={showModal}
        onCreatedStaff={(e) => fetchResource()}
      />
      <DeleteStaff
        selected={selectedStaff}
        onClose={() => {
          setshowDeleteModal(false);
          setSelectedStaff({});
        }}
        show={showDeleteModal}
      />
      <div className='d-flex mb-4 align-items-center'>
        <button
          type='button'
          onClick={() => setshowModal(true)}
          className='btn btn-secondary is_rounded mr-3'
        >
          Agregar Staff
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
          isDisabled={hotels.pending || currentHotel}
          isLoading={hotels.pending}
          options={hotels.results.map((e) => ({ label: e.name, value: e.id }))}
          ref={hotelSelect}
          onChange={(value) =>
            setSearchParams({
              ...searchParams,
              hotel: value ? value.value : null,
            })
          }
        />
        <Select
          placeholder='Posicion'
          className='w-15 mx-2'
          isClearable
          isDisabled={positions.pending}
          isLoading={positions.pending}
          options={positions.results.map((e) => ({
            label: e.name,
            value: e.id,
          }))}
          onChange={(value) =>
            setSearchParams({
              ...searchParams,
              position: value ? value.value : null,
            })
          }
        />
      </div>
      {staff.pending ? (
        <div className='d-flex justify-content-center'>
          <i className='fas fa-spinner fa-spin fa-3x'></i>
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th width='50%'>Nombre</th>
              <th>Posición</th>
              <th>Hotel</th>
              <th>
                <Button variant='light' disabled>
                  <i className='fas fa-ellipsis-h'></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {staff.results.map((staff) => (
              <tr
                // onClick={() => history.push(`${location.pathname}/${e.id}`)}
                className='table_link'
                key={staff.email}
              >
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex flex-column'>
                      <p className='mb-0'>
                        {staff.first_name} {staff.last_name}
                      </p>
                      <p className='mb-0 text-muted'>{staff.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge variant='dark' className='p-2'>
                    {staff.position}
                  </Badge>
                </td>
                <td>
                  <Badge variant='primary' className='p-2'>
                    {staff.hotel.name}
                  </Badge>
                </td>
                <td>
                  <Dropdown drop='left'>
                    <Dropdown.Toggle variant='light'>
                      <i className='fas fa-ellipsis-h'></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as='button'
                        className='d-flex justify-content-between align-items-center'
                        onClick={(e) => handleEditStaff(staff)}
                      >
                        <span>Editar</span> <i className='fas fa-edit'></i>
                      </Dropdown.Item>
                      <Dropdown.Item
                        as='button'
                        className='d-flex justify-content-between align-items-center'
                        onClick={(e) => handleDeleteStaff(staff)}
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
        count={staff.count}
        previous={staff.previous}
        next={staff.next}
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

export default Staff;
