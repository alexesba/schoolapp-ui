import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import useAddressActions from '../../../../store/actions/addreessActions';
import Input from '../../Forms/FormField/Input';

function UserAddress({ index, field, remove }) {
  const fieldName = (name) => `addresses_attributes[${index}].${name}`;
  const { setValue } = useFormContext();
  const { getOneAsync } = useAddressActions();
  const address = getOneAsync(field.id);

  useEffect(() => {
    if (address) {
      const { attributes } = address;
      setValue(fieldName('city'), attributes.city);
      setValue(fieldName('id'), attributes.id);
      setValue(fieldName('state'), attributes.state);
      setValue(fieldName('street'), attributes.street);
      setValue(fieldName('zip'), attributes.zip);
    }
  }, [address, setValue]);

  return (
    <Row>
      {index !== 0 && (<hr />)}
      <Col xl="6" sm="6">
        <Row className="mb-3">

          <Input
            name={fieldName('id')}
            label="id"
            placeholder="id"
            hidden
          />
          <Input
            name={fieldName('street')}
            label="Street"
            placeholder="Street"
          />
        </Row>
        <Row className="mb-3">
          <Input
            name={fieldName('city')}
            placeholder="City"
            label="City"
          />
        </Row>
      </Col>

      <Col xl="6" sm="6" className="position-relative">
        {index !== 0
          && (
            <i
              className="bi bi-x-circle position-absolute end-0 cursor-pointer"
              onClick={() => remove(index)}
            />
          )}

        <Row className="mb-3">
          <Input
            name={fieldName('state')}
            placeholder="State"
            label="State"
          />
        </Row>

        <Row className="mb-3">
          <Input
            label="Zip Code"
            placeholder="e.g: 28984"
            name={fieldName('zip')}
          />
        </Row>
      </Col>
    </Row>
  );
}

UserAddress.propTypes = {
  index: PropTypes.number.isRequired,
  field: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    zip: PropTypes.number,
    street: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};
export default UserAddress;
