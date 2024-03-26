import { Col, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { forwardRef } from 'react';
import { getErrorMessage, hasError } from './field-utils';

const CustomInput = forwardRef(({ placeholderText, ...props }, ref) => {
  const { errors } = useFormContext();
  return (
    <InputGroup>
      <Form.Control
        ref={ref}
        isInvalid={hasError(errors, props.name)}
        {...props}
        placeholder={placeholderText}
      />
      <InputGroup.Text onClick={props.onClick} role="button">
        <i className="fa fa-calendar-alt" />
      </InputGroup.Text>
      <Form.Control.Feedback type="invalid">
        {getErrorMessage(errors, props.name)}
      </Form.Control.Feedback>
    </InputGroup>
  );
});

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CustomInput.defaultProps = {
  onClick: () => { },
};

function InputDatePicker({ placeholder, name, label }) {
  const { control } = useFormContext();

  return (
    <Form.Group as={Col}>
      <Form.Label
        htmlFor={name}
        className="text-primary"
      >
        {label}
        <span className="required">*</span>
      </Form.Label>
      <Controller
        control={control}
        name={name}
        placeholder={placeholder}
        render={({ field }) => (
          <DatePicker
            name={name}
            selected={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            wrapperClassName="input-group"
            customInput={(
              <CustomInput
                {...field}
                placeholderText={placeholder}
              />
            )}
          />
        )}
      />
    </Form.Group>
  );
}

InputDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
};

InputDatePicker.defaultProps = {
  placeholder: '',
};

export default InputDatePicker;
