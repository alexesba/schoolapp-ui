import { range } from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Pagination({ onPrevPage, onNextPage, pagination }) {
  return (
    <div className="d-sm-flex text-center justify-content-between align-items-center">
      <div className="dataTables_info" />
      <div
        className="dataTables_paginate paging_simple_numbers justify-content-center"
        id="example-student_wrapper"
      >
        <button
          type="button"
          className={`paginate_button previous ${!pagination.previous_page ? 'disabled' : ''}`}
          onClick={onPrevPage}
          disabled={!pagination.previous_page}
        >
          <i className="fa-solid fa-angle-left" />
        </button>
        <span>
          {
            range(1, pagination.total_pages + 1).map((page) => (
              <Link className={`paginate_button ${pagination.current_page === page ? 'current' : ''}`} key={page} to={`?page=${page}`}>{page}</Link>
            ))
          }
        </span>
        <button
          type="button"
          className={`paginate_button next ${!pagination.next_page ? 'disabled' : ''}`}
          onClick={onNextPage}
          disabled={!pagination.next_page}
        >
          <i className="fa-solid fa-angle-right" />
        </button>
      </div>
    </div>
  );
}
Pagination.propTypes = {
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
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
