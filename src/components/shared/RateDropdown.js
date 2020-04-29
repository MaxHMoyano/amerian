import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { rateActions } from '../../redux/actions';

const RateDropdown = () => {
  // global Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  const tariffsTypes = useSelector(({ rate }) => rate.types);

  useEffect(() => {
    dispatch(rateActions.fetchRateTypes());
  }, [dispatch]);

  return (
    <Dropdown>
      <Dropdown.Toggle className="is_rounded mr-2" variant="secondary" id="dropdown-basic">
        Nueva Tarifa
          </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          tariffsTypes.map((e) => (
            <Dropdown.Item key={e.value} onClick={() => history.push(`/comercial/rates/new-rate?type=${e.value}`)}>{e.name}</Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RateDropdown;
