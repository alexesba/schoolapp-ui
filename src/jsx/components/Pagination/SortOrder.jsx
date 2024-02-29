import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

function SortOrder({ sortOrder }) {
  const [queryParams, setQueryParams] = useSearchParams();

  const onSetOrder = (order) => {
    queryParams.set('order', order);
    setQueryParams(queryParams);
  };

  return (
    <Dropdown className="drop-select me-3">
      <Dropdown.Toggle as="div" className="drop-select-btn ">
        {sortOrder === 'desc' ? 'Oldest' : 'Newest'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onSetOrder('asc')}>Newest</Dropdown.Item>
        <Dropdown.Item onClick={() => onSetOrder('desc')}>Oldest</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

SortOrder.propTypes = {
  sortOrder: PropTypes.string.isRequired,
};

export default SortOrder;
