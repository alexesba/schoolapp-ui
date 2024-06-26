import { Col, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { getErrorMessage, hasError } from './field-utils';
import { multipleply } from 'lodash';
import { useEffect } from 'react';

function SelectInput({
  name, label, placeholder, options, required,
  multiple,
  showIcon,
}) {
  const { errors, register, watch } = useFormContext();
  const icon = watch(name);

  useEffect(() => {
    console.log('mounted', name);

    return () => {
      console.log('mounted', name);
    };
  }, [])

  return (
    <Form.Group as={Col}>
      <Form.Label
        htmlFor={name}
        className="text-primary"
      >
        {label}
        {required && <span className="required">*</span>}
      </Form.Label>
      <InputGroup>
        {showIcon && (
          <InputGroup.Text>
            <i className={classNames({
              'bi bi-flag-fill': !icon,
              'flag-icon': icon,
              [`flag-icon-${icon}`]: icon,
            })}
            />
          </InputGroup.Text>
        )}
        <Form.Control
          as={Form.Select}
          isInvalid={hasError(errors, name)}
          {...register(name)}
          multiple={multiple}
        >
          <option value="">{placeholder}</option>
          {
            options.map((option) => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))
          }
        </Form.Control>
        <Form.Control.Feedback type="invalid">{getErrorMessage(errors, name) || ' '}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

SelectInput.propTypes = {
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showIcon: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
};

SelectInput.defaultProps = {
  multiple: false,
  showIcon: false,
  required: false,
  placeholder: '',
  options: [],
};

export default SelectInput;
