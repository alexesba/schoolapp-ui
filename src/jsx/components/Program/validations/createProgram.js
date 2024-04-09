import * as yup from 'yup';

const createProgramSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  alpha_2_code: yup.string().required('Language is required')
    .min(2, 'Language must have 2 digits')
    .max(2, 'Language must have 2 digits'),
});

export default createProgramSchema;
