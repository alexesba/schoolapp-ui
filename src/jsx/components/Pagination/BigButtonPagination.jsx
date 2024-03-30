import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createContext, useCallback, useMemo } from 'react';
import { createUltimatePagination } from 'react-ultimate-pagination';

const PaginationContext = createContext();

function Page({ value, isActive }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <li className={classNames('page-item', { active: isActive })}>
          <Link className="page-link" to={getUrl(value)}>
            {value}
          </Link>
        </li>
      )}
    </PaginationContext.Consumer>
  );
}

Page.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

function PreviousPageLink({ value, disabled }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <li className="page-item page-indicator">
          <Link className="page-link" to={getUrl(value)} disabled={disabled}>
            <i className="fa-solid fa-chevron-left" />
          </Link>
        </li>
      )}
    </PaginationContext.Consumer>
  );
}

PreviousPageLink.propTypes = {
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function NextPageLink({ value, disabled }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <li className="page-item page-indicator">
          <Link className="page-link" to={getUrl(value)} disabled={disabled}>
            <i className="fa-solid fa-chevron-right" />
          </Link>
        </li>
      )}
    </PaginationContext.Consumer>
  );
}

NextPageLink.propTypes = {
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function Ellipsis({ disabled }) {
  return (
    <li className="page-item page-indicator">
      <Link className="page-link" to="#!" disabled={disabled}>
        <i className="fa-solid fa-ellipsis" />
      </Link>
    </li>
  );
}

Ellipsis.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

function FirstPageLink({ value, disabled }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <li className="page-item page-indicator">
          <Link className="page-link" to={getUrl(value)} disabled={disabled}>
            <i className="fas fa-angle-double-left" />
          </Link>
        </li>
      )}
    </PaginationContext.Consumer>
  );
}

FirstPageLink.propTypes = {
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function LastPageLink({ value, disabled }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <li className="page-item page-indicator">
          <Link className="page-link" to={getUrl(value)} disabled={disabled}>
            <i className="fas fa-angle-double-right" />
          </Link>
        </li>
      )}
    </PaginationContext.Consumer>
  );
}

LastPageLink.propTypes = {
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

function WrapperComponent({ children }) {
  return (
    <PaginationContext.Consumer>
      {({ from, to, totalEntries }) => (
        <div className="table-pagenation teach">
          <small>
            {`Showing ${from()} - ${to()} from ${totalEntries} entries`}
          </small>
          <nav>
            <ul className="pagination pagination-gutter pagination-primary no-bg">
              {children}
            </ul>
          </nav>
        </div>
      )}
    </PaginationContext.Consumer>
  );
}

WrapperComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const itemTypeToComponent = {
  PAGE: Page,
  ELLIPSIS: Ellipsis,
  FIRST_PAGE_LINK: FirstPageLink,
  PREVIOUS_PAGE_LINK: PreviousPageLink,
  NEXT_PAGE_LINK: NextPageLink,
  LAST_PAGE_LINK: LastPageLink,
};

function BigButtonPagination({ pagination }) {
  const [queryParams] = useSearchParams();

  const {
    count,
    current_page: currentPage,
    per_page: perPage,
    total_entries: totalEntries,
    total_pages: totalPages,
  } = pagination;

  const getUrl = useCallback((page) => {
    queryParams.set('page', page);
    return `?${queryParams.toString()}`;
  }, [queryParams]);

  const from = useCallback(() => {
    if (count) return (((currentPage * perPage) - perPage) || 1);
    return count;
  }, [currentPage]);

  const to = () => ((currentPage - 1) * perPage) + count;

  const PaginationComponent = createUltimatePagination({
    itemTypeToComponent,
    WrapperComponent,
  });

  const value = useMemo(() => ({
    getUrl, from, to, totalEntries, count,
  }), [getUrl, from, to, totalEntries, count]);

  return (
    <PaginationContext.Provider value={value}>
      <PaginationComponent
        currentPage={currentPage || 0}
        totalPages={totalPages || 0}
      />
    </PaginationContext.Provider>
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
