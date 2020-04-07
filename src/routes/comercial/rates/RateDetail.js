import React, { Fragment, useEffect } from 'react';
import { rateActions } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const RateDetail = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rateActions.fetchRate());
  }, [dispatch]);

  return (
    <Fragment>

    </Fragment>
  );
};

export default RateDetail;
