import { range } from 'lodash';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function BigButtonPagination({ pagination }) {
  const [queryParams, setSearchParams] = useSearchParams();
  const {
    current_page: currentPage,
    per_page: perPage,
    total_pages: totalPages,
    count,
    previous_page: previousPage,
    next_page: nextPage,
    total_entries: totalEntries,
  } = pagination;

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
    <div className="table-pagenation teach">
      <small>
        Showing
        {' '}
        <span>
          {from()}
          {' '}
          -
          {' '}
          {to()}
          {' '}
        </span>
        from
        {' '}
        <span>
          {' '}
          {totalEntries}
          {' '}
        </span>
        entries
      </small>
      <nav>
        <ul className="pagination pagination-gutter pagination-primary no-bg">
          <li className="page-item page-indicator">
            <Button className="page-link" onClick={() => goPreviousPage(previousPage)} disabled={!previousPage}>
              <i className="fa-solid fa-chevron-left" />
            </Button>
          </li>
          {
            range(1, totalPages + 1).map((page) => (
              <li className={classNames('page-item', { active: currentPage === page })}>
                <Button className="page-link" onClick={() => goToPage(page)}>
                  {page}
                </Button>
              </li>
            ))
          }
          <li className="page-item page-indicator">
            <Button className="page-link" onClick={() => goNextPage(nextPage)} disabled={!nextPage}><i className="fa-solid fa-chevron-right" /></Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

BigButtonPagination.propTypes = {
  pagination: PropTypes.shape({
    count: PropTypes.number.isRequired,
    total_entries: PropTypes.number.isRequired,
    next_page: PropTypes.oneOfType([
      PropTypes.number,
      () => null,
    ]),
    per_page: PropTypes.oneOfType([
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

export default BigButtonPagination;
