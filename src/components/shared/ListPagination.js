import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const ListPagination = ({
  count,
  limit,
  offset,
  previous,
  next,
  onPreviousPage,
  onNextPage,
}) => {
  let pageCount = Math.ceil(count / limit);
  let currentPage = Math.floor(offset / limit) + 1;
  const getPages = () => {
    console.log(currentPage);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage}>
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  return (
    <Pagination className='justify-content-end'>
      <Pagination.Prev onClick={onPreviousPage} disabled={!previous} />
      {getPages()}
      <Pagination.Next onClick={onNextPage} disabled={!next} />
    </Pagination>
  );
};

ListPagination.propTypes = {
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
  onPreviousPage: PropTypes.func,
  onNextPage: PropTypes.func,
};

export default ListPagination;
