import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button, Card, Col, Form, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import createProgramSchema from '../validations/createProgram';
import SelectInput from '../../Forms/FormField/SelectInput';
import Input from '../../Forms/FormField/Input';
import TextArea from '../../Forms/FormField/TextArea';
import 'flag-icon-css/css/flag-icons.css';
import useProgramActions from '../../../../store/actions/programActions';
import { languageOptions } from '../../../../constants/app';

function ProgramForm({ initialValues, submitAction }) {
  const onSubmit = async (values) => submitAction(values);

  const { getAll: getAllPrograms } = useProgramActions();

  const {
    setValue,
    control,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(createProgramSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    getAllPrograms();
  }, []);

  return (
    <FormProvider
      control={control}
      errors={errors}
      register={register}
      setValue={setValue}
      watch={watch}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Col xl="12">
          <Card>
            <Card.Header>
              <Card.Title>Program Details </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="6">
                  <Input
                    name="organization_id"
                    hidden
                  />
                  <Input
                    name="name"
                    label="Name"
                    required
                  />
                </Col>
                <Col md="6">
                  <SelectInput
                    name="alpha_2_code"
                    label="Country"
                    className="form-control"
                    options={languageOptions}
                    required
                  />
                </Col>
                <Col>
                  <TextArea
                    name="description"
                    label="Description"
                    required
                  />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Row>
                <div className="d-flex flex-row-reverse">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="me-3"
                    type="button"
                    onClick={() => reset(initialValues)}
                  >
                    Reset
                  </Button>
                </div>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Form>
    </FormProvider>
  );
}

ProgramForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    alpha_2_code: PropTypes.string,
    organization_id: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
  }).isRequired,
  submitAction: PropTypes.func.isRequired,
};
export default ProgramForm;
