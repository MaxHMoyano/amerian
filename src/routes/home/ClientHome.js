import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { sharedActions, hotelActions } from '../../redux/actions';
import { useState } from 'react';

const ClientHome = () => {
  const dispatch = useDispatch();

  const countries = useSelector(({ shared }) => shared.countries);
  const regions = useSelector(({ shared }) => shared.regions);
  const hotels = useSelector(({ hotel }) => hotel);
  const currentClient = useSelector(({ client }) => client.current);

  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    dispatch(sharedActions.fetchCountries());
    dispatch(hotelActions.fetchHotels());
  }, [dispatch]);

  // change region when changing country
  const handleCountryChange = (value) => {
    if (value) {
      dispatch(sharedActions.fetchRegions(value.value));
    }
    setSelectedCountry(value);
  };

  return (
    <div className='client_home'>
      <div className='client_home_container'>
        {/* <img alt='Client image' src={} /> */}
        <h2>Convenio de cliente</h2>
        <h1>{currentClient.name}</h1>
        <div className='d-flex'>
          <Form.Group className='mr-3 w-50'>
            <Form.Label className='text-white'>Pais</Form.Label>
            <Select
              placeholder='Pais:'
              isClearable
              isLoading={countries.pending}
              onChange={handleCountryChange}
              options={countries.results.map((e) => ({
                label: e.name,
                value: e.id,
              }))}
            />
          </Form.Group>
          <Form.Group className='mx-2 w-50'>
            <Form.Label className='text-white'>Provincia</Form.Label>
            <Select
              isLoading={regions.pending}
              isDisabled={selectedCountry ? false : true}
              placeholder='Provincia:'
              isClearable
              options={regions.results.map((e) => ({
                label: e.name,
                value: e.id,
              }))}
            />
          </Form.Group>
          <Form.Group className='ml-3 w-50'>
            <Form.Label className='text-white'>Hotel</Form.Label>
            <Select
              isLoading={hotels.pending}
              placeholder='Hotel:'
              isClearable
              options={hotels.results.map((hotel) => ({
                label: hotel.name,
                value: hotel.id,
              }))}
            />
          </Form.Group>
        </div>
        <Button
          className='p-2 mt-3 is_rounded'
          style={{ width: '70%' }}
          variant='primary'
        >
          Ver Convenio
        </Button>
        <div className='d-flex' style={{ marginTop: '10rem' }}>
          <Button
            className='mx-4 is_rounded'
            style={{ padding: '.5rem 2rem' }}
            variant='dark'
          >
            <i className='fas fa-print mr-2'></i>
            Imprimir convenio
          </Button>
          <Button
            className='mx-4 is_rounded'
            style={{ padding: '.5rem 2rem' }}
            variant='dark'
          >
            <i className='fas fa-file-pdf mr-2'></i>
            Descargar convenio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
