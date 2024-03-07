import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function StudentDetailsItem({ image, title, subtitle }) {
  return (
    <div className="col-xl-3 col-xxl-6 col-sm-6">
      <ul className="student-details">
        <li className="me-2">
          <Link to="#" className="icon-box bg-secondary">
            <img src={image} alt="" />
          </Link>
        </li>
        <li>
          <span>
            {title}
            :
          </span>
          <h5 className="mb-0 break-word">{subtitle}</h5>
        </li>
      </ul>
    </div>
  );
}

StudentDetailsItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default StudentDetailsItem;
