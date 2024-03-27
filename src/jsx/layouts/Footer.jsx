import React from 'react';
import PropTypes from 'prop-types';

function Footer({changeFooter}) {
  return (
    <div className={`footer ${changeFooter}`}>
      <div className="copyright">
        <p>
          Developed by
          {' '}
          <a href="http://github.com/alexesba" target="_blank" rel="noreferrer">
            @zaznova
          </a>
          {' '}
          2024
        </p>
      </div>
    </div>
  );
}

Footer.propTypes = {
  changeFooter: PropTypes.string,
};

Footer.defaultProps = {
  changeFooter: '',
};

export default Footer;
