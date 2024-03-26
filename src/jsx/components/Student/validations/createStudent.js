import * as yup from 'yup';

const EMAIL_REGX = /^[^@\s]+@[^@.\s]+(?:\.[^@.\s]+)+$/;

const createStudentSchema = yup.object().shape({
  first_name: yup.string().required('Fist name is required'),
  last_name: yup.string().required('Last name is required'),
  middle_name: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').matches(EMAIL_REGX, 'Emails is not valid'),
  date_of_birth: yup.date().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
  organization_id: yup.string().required('Organization is required'),
  mobile_phone: yup.string().required('Phone number is required')
    .min(10, 'Phone number must have 10 digits')
    .max(10, 'Phone number must have 10 digits'),
  addresses_attributes: yup.array().of(yup.object().shape({
    street: yup.string().required('Street is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    zip: yup.string().required('Zip is required'),
  })),
  parents_attributes: yup.array().of(yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    middle_name: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required').matches(EMAIL_REGX, 'Emails is not valid'),
    organization_id: yup.string().required('Organization is required'),
    mobile_phone: yup.string().required('Phone number is required')
      .min(10, 'Phone number must have 10 digits')
      .max(10, 'Phone number must have 10 digits'),
    gender: yup.string().required('Gender is required'),
  })),

});

export default createStudentSchema;
