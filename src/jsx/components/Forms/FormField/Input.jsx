import { Col, Form } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { getErrorMessage, hasError } from './field-utils';

function Input({
  name, label, type, placeholder, hidden,
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
        <span className="required">*</span>
      </Form.Label>
      )}
      <Form.Control
        type={type}
        placeholder={placeholder}
        isInvalid={hasError(errors, name)}
        {...register(name)}
      />
      <Form.Control.Feedback type="invalid">{getErrorMessage(errors, name) || ' '}</Form.Control.Feedback>
    </Form.Group>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  hidden: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  hidden: false,
  type: 'text',
  placeholder: '',
};

export default Input;
