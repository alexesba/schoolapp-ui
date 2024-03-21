import { Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { getErrorMessage, hasError } from './field-utils';

function Input({
  name, label, type, placeholder,
}) {
  const { errors, register } = useFormContext();
  return (
    <Form.Group as={Col}>
      <Form.Label
        htmlFor={name}
        className="text-primary"
      >
        {label}
        <span className="required">*</span>
      </Form.Label>
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
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default Input;
