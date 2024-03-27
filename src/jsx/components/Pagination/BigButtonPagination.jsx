import { range } from 'lodash';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function BigButtonPagination({ pagination, records }) {
  const [queryParams, setSearchParams] = useSearchParams();
  const {
    current_page, per_page, total_pages, count, previous_page, next_page,
  } = pagination;

  const goToPage = (page) => {
    queryParams.set('page', page);
    setSearchParams(queryParams);
  };
  const previousPage = (page) => {
    goToPage(page || 1);
  };

  const nextPage = (page) => {
    goToPage(page || current_page);
  };

  return (
    <div className="table-pagenation teach">
      <small>
        Showing <span> {1 * current_page} - {records} </span>
        from <span>{count} </span>
        teachers
      </small>
      <nav>
        <ul className="pagination pagination-gutter pagination-primary no-bg">
          <li className="page-item page-indicator">
            <Button className="page-link" onClick={() => previousPage(previous_page)} disabled={!previous_page}>
              <i className="fa-solid fa-chevron-left" />
            </Button>
          </li>
          {
            range(1, total_pages + 1).map((page) => (
              <li className={classNames('page-item', { active: current_page === page })}>
                <Button className="page-link" onClick={() => goToPage(page)}>
                  {page}
                </Button>
              </li>
            ))
          }
          <li className="page-item page-indicator">
            <Button className="page-link" onClick={() => nextPage(next_page)} disabled={!next_page}><i className="fa-solid fa-chevron-right" /></Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

BigButtonPagination.propTypes = {
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

export default BigButtonPagination;
