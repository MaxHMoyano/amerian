import config from 'config';
import { authHeader } from '../../helpers/auth-header';
import { API_VERSION } from '../../helpers/apiVersion';
import { handleResponse, buildUrl } from '../../helpers/utilities';

export const rateService = {
  fetchRates,
  fetchRate,
  createRate,
  fetchRateTypes,
  fetchRateStates,
  createRateAmount,
  createRateDetail,
  createRateCondition,
  fetchRateConditions,
  fetchRateDetails,
  fetchRateAmounts,
  partialUpdateRate,
};

function fetchRates(searchParams, url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  if (!url) {
    if (searchParams.hotel) {
      url = buildUrl(
        `${config.apiUrl}/${API_VERSION}/hotels/${searchParams.hotel}/rates/`,
        searchParams
      );
    } else {
      url = buildUrl(`${config.apiUrl}/${API_VERSION}/rates/`, searchParams);
    }
  }
  return fetch(url, requestOptions).then(handleResponse);
}

function createRate(hotelId, rate) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(rate),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchRate(rateId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/rates/${rateId}/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchRateConditions(hotelId, rateId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/${rateId}/special-conditions/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchRateDetails(hotelId, rateId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/${rateId}/rate-details/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}

function partialUpdateRate(hotelId, rateId, rate) {
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(rate),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/${rateId}/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchRateAmounts(hotelId, rateId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/${rateId}/rate-amounts/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchRateTypes() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/rates/types/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchRateStates() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/rates/status/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function createRateAmount(hotelId, rateId, rateAmount) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(rateAmount),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/${rateId}/rate-amounts/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}

function createRateDetail(hotelId, rateId, rateDetail) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(rateDetail),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/${rateId}/rate-details/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}

function createRateCondition(hotelId, rateId, rateCondition) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(rateCondition),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/${rateId}/special-conditions/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}
