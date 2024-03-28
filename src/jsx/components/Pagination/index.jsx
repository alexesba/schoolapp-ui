import { range } from 'lodash';
import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';

function Pagination({
  pagination: {
    current_page: currentPage,
    per_page: perPage,
    total_pages: totalPages,
    count,
    previous_page: previousPage,
    next_page: nextPage,
    total_entries: totalEntries,
  },
}) {
  const [queryParams, setSearchParams] = useSearchParams();

  const goToPage = (page) => {
    queryParams.set('page', page);
    setSearchParams(queryParams);
  };

  const goPreviousPage = (page) => {
    goToPage(page || 1);
  };

  const goNextPage = (page) => {
    goToPage(page || currentPage);
  };

  const from = () => {
    if (count) return (((currentPage * perPage) - perPage) || 1);

    return count;
  };

  const to = () => ((currentPage - 1) * perPage) + count;

  return (
    <div className="d-sm-flex text-center justify-content-between align-items-center">
      <div className="dataTables_info">
        Showing
        {' '}
        {from()}
        {' '}
        to
        {' '}
        {to()}
        {' '}
        of
        {' '}
        {totalEntries}
        {' '}
        entries
      </div>
      <div
        className="dataTables_paginate paging_simple_numbers justify-content-center"
        id="example-student_wrapper"
      >
        <Button
          className={classNames('paginate_button previous', { disabled: !previousPage })}
          onClick={() => goPreviousPage(previousPage)}
          disabled={!previousPage}
        >
          <i className="fa-solid fa-angle-left" />
        </Button>
        <span>
          {
            range(1, totalPages + 1).map((page) => {
              queryParams.set('page', page);
              return (
                <Link className={classNames('paginate_button', { current: currentPage === page })} key={page} to={`?${queryParams.toString()}`}>
                  {page}
                </Link>
              );
            })
          }
        </span>
        <Button
          className={classNames('paginate_button next', { disabled: !nextPage })}
          onClick={() => goNextPage(nextPage)}
          disabled={!nextPage}
        >
          <i className="fa-solid fa-angle-right" />
        </Button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.shape({
    count: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    total_entries: PropTypes.number.isRequired,
    next_page: PropTypes.oneOfType([
      PropTypes.number,
      () => null,
    ]),
    previous_page: PropTypes.oneOfType([
      PropTypes.number,
      () => null,
    ]),
    total_pages: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      () => null,
    ]),
    current_page: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      () => null,
    ]),
  }).isRequired,
};

export default Pagination;
