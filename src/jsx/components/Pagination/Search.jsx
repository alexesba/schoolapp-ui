import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function Search({ query }) {
  const [queryParams, setQueryParams] = useSearchParams();

  const setQuery = (query) => {
    queryParams.set('q', query);
    setQueryParams(queryParams);
  }

  const handleSearch = (text) => {
    if ([1, 2].includes(text.length) == false) {
      setQuery(text);
    }
  }

  return (
    <div className="input-group search-area mb-md-0 mb-3">
      <input type="text" className="form-control"
        placeholder="Search here..."
        onChange={(event) => { handleSearch(event.target.value) }}
      />
      <span className="input-group-text">
        <Link to="javascript:void(0)">
          <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z" fill="#01A3FF" />
          </svg>
        </Link>
      </span>
    </div>
  );
};

Search.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Search;