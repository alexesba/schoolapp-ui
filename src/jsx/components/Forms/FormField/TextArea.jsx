import { Col, Form } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { getErrorMessage, hasError } from './field-utils';

function TextArea({
  name, label, placeholder, hidden, required,
}) {
  const { errors, register } = useFormContext();
  const textAreaProps = register(name);
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
      <textarea
        className={classNames('form-control', {
          'is-invalid': hasError(errors, name),
        })}
        placeholder={placeholder}
        {...textAreaProps}
      >
        {textAreaProps.value}
      </textarea>
      <Form.Control.Feedback type="invalid">{getErrorMessage(errors, name) || ' '}</Form.Control.Feedback>
    </Form.Group>
  );
}

TextArea.propTypes = {
  hidden: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

TextArea.defaultProps = {
  label: null,
  hidden: false,
  required: false,
  placeholder: '',
};

export default TextArea;
