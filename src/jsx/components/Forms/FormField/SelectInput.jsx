import { Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { propTypes } from 'react-bootstrap/esm/Image';
import { getErrorMessage, hasError } from './field-utils';

function SelectInput({
  name, label, placeholder,
  options,
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
      <Form.Select
        className="form-control"
        isInvalid={hasError(errors, name)}
        {...register(name)}
      >
        <option value="">{placeholder}</option>
        {
          options.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))
        }
      </Form.Select>
      <Form.Control.Feedback type="invalid">{getErrorMessage(errors, name) || ' '}</Form.Control.Feedback>
    </Form.Group>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
};

SelectInput.defaultProps = {
  placeholder: '',
  options: [],
};

export default SelectInput;
