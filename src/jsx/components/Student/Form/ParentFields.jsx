import { Col, Row, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import Input from '../../Forms/FormField/Input';
import { GENDER_OPTIONS } from '../../../../constants/app';
import SelectInput from '../../Forms/FormField/SelectInput';
import useParentActions from '../../../../store/parentActions';

function ParentFields({ field, index, remove }) {
  const fieldName = (name) => `parents_attributes[${index}].${name}`;

  const { setValue } = useFormContext();
  const { getOneAsync } = useParentActions();

  const parent = getOneAsync(field.id);

  useEffect(() => {
    if (parent) {
      const { attributes } = parent;
      Object.keys(field).forEach((propName) => {
        setValue(fieldName(propName), attributes[propName]);
      });
    }
  }, [parent, setValue]);

  return (
    <Row key={field.objId}>
      {index !== 0 && (<hr />)}
      <Col xl="6" xm="6">
        <Row className="mb-3">
          <Input
            label="id"
            name={fieldName('id')}
            hidden
          />
          <Input
            label="organization_id"
            name={fieldName('organization_id')}
            hidden
          />
          <Input
            name={fieldName('first_name')}
            label="First Name"
            placeholder="First Name"
            required
          />
        </Row>
        <Row className="mb-3">
          <Input
            name={fieldName('email')}
            label="Email"
            placeholder="hello@example.com"
            required
          />
        </Row>

        <Row className="mb-3">
          <SelectInput
            name={fieldName('gender')}
            label="Gender"
            className="form-control"
            placeholder="Select an option"
            options={GENDER_OPTIONS}
            required
          />
        </Row>

      </Col>
      <div className="col-xl-6 col-sm-6 position-relative">
        {index !== 0
          && (
            <i
              className="bi bi-x-circle position-absolute end-0 cursor-pointer pl-10"
              onClick={() => remove(index)}
            />
          )}
        <Row className="mb-3">
          <Input
            name={fieldName('last_name')}
            placeholder="Last Name"
            label="Last Name"
            required
          />
        </Row>
        <Row className="mb-3">
          <Input
            name={fieldName('mobile_phone')}
            type="number"
            label="Phone Number"
            placeholder="+3123234682"
            required
          />
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="form-label text-primary">
              Payments
              <span className="required">*</span>
            </Form.Label>
            <div className="d-flex align-items-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label font-w500" htmlFor="flexCheckDefault">Cash</label>
              </div>
              <div className="form-check ms-3">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                <label className="form-check-label font-w500" htmlFor="flexCheckDefault1">Online</label>
              </div>
            </div>
          </Form.Group>
        </Row>
      </div>
    </Row>
  );
}

ParentFields.propTypes = {
  index: PropTypes.number.isRequired,
  field: PropTypes.shape({
    objId: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    first_name: PropTypes.string,
    las_name: PropTypes.string,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export default ParentFields;
