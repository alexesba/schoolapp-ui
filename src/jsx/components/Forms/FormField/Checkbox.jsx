import { Col, Form } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { getErrorMessage, hasError } from './field-utils';

function Checkbox({
  name, label, type, placeholder, hidden, required
}) {
  const { errors, register } = useFormContext();
  return (
    <Form.Group
      as={Col}
      className={
        classNames('text-primary', {
          'd-none': hidden,
        })
      }
    >
      {label && (
      <Form.Label htmlFor={name} className="text-primary">
        {label}
        { required && <span className="required">*</span> }
      </Form.Label>
      )}
      <Form.Check
        type={type}
        placeholder={placeholder}
        isInvalid={hasError(errors, name)}
        {...register(name)}
      />
      <Form.Control.Feedback type="invalid">{getErrorMessage(errors, name) || ' '}</Form.Control.Feedback>
    </Form.Group>
  );
}

Checkbox.propTypes = {
  type: PropTypes.string,
  hidden: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

Checkbox.defaultProps = {
  label: null,
  hidden: false,
  required: false,
  type: 'checkbox',
  placeholder: '',
};

export default Checkbox;
