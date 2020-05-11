import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Table,
  Row,
  Col,
  Badge,
  Pagination,
  Dropdown,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hotelActions, sharedActions, userActions } from '../../redux/actions';
import HotelDetail from './HotelDetail';
import DeleteHotel from './DeleteHotel';
import Select from 'react-select';
import ListPagination from '../../components/shared/ListPagination';

const HotelsList = () => {
  const dispatch = useDispatch();

  // local state
  const [selectedHotel, setSelectedHotel] = useState({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [searchParams, setSearchParams] = useState({
    search: null,
    country: null,
    region: null,
    active: null,
    limit: 10,
    offset: 0,
  });

  // refresh actions
  useEffect(() => {
    dispatch(hotelActions.fetchHotels(searchParams));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(hotelActions.fetchChains());
    dispatch(sharedActions.fetchCountries());
  }, [dispatch]);

  // selectors
  let countries = useSelector(({ shared }) => shared.countries);
  let regions = useSelector(({ shared }) => shared.regions);
  let hotels = useSelector(({ hotel }) => hotel);

  // utility functions
  const handleDeleteHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowDeleteModal(true);
  };

  const handleEditHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowDetailModal(true);
  };

  const handleCountryChange = (value) => {
    dispatch(sharedActions.fetchRegions(value.value));
    setSearchParams({ ...searchParams, country: value.value });
  };

  const handleSearchChange = (e) => {
    if (e.key === 'Enter') {
      setSearchParams({ ...searchParams, search: e.target.value });
    }
  };

  const goToHotel = (hotel) => {
    dispatch(userActions.showContentAsInHotel(true, hotel.id));
  };

  return (
    <Fragment>
      <HotelDetail
        selected={selectedHotel}
        onClose={(e) => {
          setShowDetailModal(false);
          setSelectedHotel({});
        }}
        show={showDetailModal}
      />
      <DeleteHotel
        hotel={selectedHotel}
        onClose={(e) => setShowDeleteModal(false)}
        show={showDeleteModal}
      />
      <Row>
        <Col className='d-flex'>
          <Button
            onClick={() => setShowDetailModal(true)}
            className='is_rounded'
            variant='secondary'
          >
            Agregar Hotel
          </Button>
          <div className='icon_input search mx-2 w-15'>
            <Form.Control
              placeholder='Buscar...'
              onKeyPress={handleSearchChange}
              type='text'
            />
            <i className='fas fa-search'></i>
          </div>
          <Select
            placeholder='Pais'
            className='w-15 mx-2'
            onChange={handleCountryChange}
            isLoading={countries.pending}
            isDisabled={hotels.pending}
            options={countries.results.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
          />
          <Select
            placeholder='Provincia'
            className='w-15 mx-2'
            onChange={(value) =>
              setSearchParams({ ...searchParams, region: value.value })
            }
            isLoading={regions.pending}
            isDisabled={!regions.results.length || hotels.pending}
            options={regions.results.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
          />
          <Select
            placeholder='Activo'
            className='w-15 mx-2'
            isDisabled={hotels.pending}
            onChange={(value) =>
              setSearchParams({ ...searchParams, active: value.value })
            }
            options={[
              { label: 'Activo', value: true },
              { label: 'Inactivo', value: false },
            ]}
          />
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col>
          {!hotels.pending ? (
            hotels.results.length ? (
              <div>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Hotel</th>
                      <th>Pais</th>
                      <th>Provincia</th>
                      <th>Estado</th>
                      <th>
                        <Button variant='light' disabled>
                          <i className='fas fa-ellipsis-h'></i>
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotels.results.map((hotel) => (
                      <tr key={hotel.id} className='table_link'>
                        <td onClick={(e) => goToHotel(hotel)}>
                          <div className='d-flex flex-column'>
                            <p
                              className='m-0 text-info icon-button'
                              style={{ fontSize: '1.05rem' }}
                            >
                              {hotel.name}
                            </p>
                            <p className='text-muted m-0'>{hotel.chain}</p>
                          </div>
                        </td>
                        <td>{hotel.country}</td>
                        <td>{hotel.region}</td>
                        <td>
                          <Badge
                            className='p-2'
                            variant={hotel.active ? 'success' : 'danger'}
                          >
                            {hotel.active ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </td>
                        <td>
                          <Dropdown drop='left'>
                            <Dropdown.Toggle variant='light'>
                              <i className='fas fa-ellipsis-h'></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={(e) => handleEditHotel(hotel)}
                                as='button'
                                className='d-flex justify-content-between align-items-center'
                              >
                                <span>Editar</span>{' '}
                                <i className='fas fa-edit'></i>
                              </Dropdown.Item>
                              <Dropdown.Item
                                as='button'
                                onClick={(e) => handleDeleteHotel(hotel)}
                                className='d-flex justify-content-between align-items-center'
                              >
                                <span>Eliminar</span>{' '}
                                <i className='fas fa-trash'></i>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div
                className='d-flex flex-column justify-content-center align-items-center cursor_pointer'
                onClick={(e) => setShowDetailModal(true)}
              >
                <h4 className='text-muted text-center'>
                  No existen hoteles creados. Crea uno ahora!
                </h4>
                <i className='fas fa-hotel fa-4x text-muted'></i>
              </div>
            )
          ) : (
            <div className='d-flex flex-column justify-content-center align-items-center'>
              {' '}
              <i className='fas fa-spinner fa-spin fa-3x'></i>{' '}
            </div>
          )}
          <ListPagination
            count={hotels.count}
            limit={searchParams.limit}
            offset={searchParams.offset}
            previous={hotels.previous}
            next={hotels.next}
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
        </Col>
      </Row>
    </Fragment>
  );
};

export default HotelsList;
