import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { createUltimatePagination } from 'react-ultimate-pagination';
import { createContext, useCallback, useMemo } from 'react';

const PaginationContext = createContext();

function Page({ value, isActive }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <span>
          <Link className={classNames('paginate_button', { current: isActive })} to={getUrl(value)}>
            {value}
          </Link>
        </span>
      )}
    </PaginationContext.Consumer>
  );
}

Page.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

Page.defaultProps = {
  isActive: false,
};

function PreviousPageLink({ value, isActive }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <Link
          className="paginate_button previous"
          to={getUrl(value)}
          style={isActive ? { pointerEvents: 'none' } : {}}
        >
          <i className="fa-solid fa-angle-left" />
        </Link>
      )}
    </PaginationContext.Consumer>
  );
}

PreviousPageLink.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

PreviousPageLink.defaultProps = {
  isActive: false,
};

function NextPageLink({ value, isActive }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <Link
          className="paginate_button next"
          to={getUrl(value)}
          style={isActive ? { pointerEvents: 'none' } : {}}
        >
          <i className="fa-solid fa-angle-right" />
        </Link>
      )}
    </PaginationContext.Consumer>
  );
}

NextPageLink.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

NextPageLink.defaultProps = {
  isActive: false,
};

function Ellipsis() {
  return (
    <Button className="paginate_button previous" disabled>
      <i className="fa-solid fa-ellipsis" />
    </Button>
  );
}

function FirstPageLink({ value, isActive }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <Link
          className="paginate_button previous"
          to={getUrl(value)}
          style={isActive ? { pointerEvents: 'none' } : {}}
        >
          <i className="fas fa-angle-double-left" />
        </Link>
      )}
    </PaginationContext.Consumer>
  );
}

FirstPageLink.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

FirstPageLink.defaultProps = {
  isActive: true,
};

function LastPageLink({ value, isActive }) {
  return (
    <PaginationContext.Consumer>
      {({ getUrl }) => (
        <Link
          className="paginate_button next"
          to={getUrl(value)}
          style={isActive ? { pointerEvents: 'none' } : {}}
        >
          <i className="fas fa-angle-double-right" />
        </Link>
      )}
    </PaginationContext.Consumer>
  );
}

LastPageLink.propTypes = {
  value: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

LastPageLink.defaultProps = {
  isActive: false,
};

function WrapperComponent({ children }) {
  return (
    <PaginationContext.Consumer>
      {({ from, to, totalEntries }) => (
        <div className="d-sm-flex text-center justify-content-between align-items-center">
          <div className="dataTables_info">
            {`Showing ${from()} to ${to()} of ${totalEntries || 0} entries`}
          </div>
          <div
            className="dataTables_paginate paging_simple_numbers justify-content-center"
            id="example-student_wrapper"
          >
            {children}
          </div>
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

function Pagination({
  pagination: {
    count,
    current_page: currentPage,
    per_page: perPage,
    total_entries: totalEntries,
    total_pages: totalPages,
  },
}) {
  const [queryParams] = useSearchParams();

  const getUrl = useCallback((page) => {
    queryParams.set('page', page);
    return `?${queryParams.toString()}`;
  }, [queryParams]);

  const from = useCallback(() => {
    if (count) return (((currentPage * perPage) - perPage) || 1);
    return count || 0;
  }, [currentPage]);

  const to = () => (count && ((currentPage - 1) * perPage) + count) || 0;

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

Pagination.propTypes = {
  pagination: PropTypes.shape({
    count: PropTypes.number,
    per_page: PropTypes.number,
    total_entries: PropTypes.number,
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
