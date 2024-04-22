import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button, Card, Col, Form, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import createProgramSchema from '../validations/createProgram';
import SelectInput from '../../Forms/FormField/SelectInput';
import Input from '../../Forms/FormField/Input';
import TextArea from '../../Forms/FormField/TextArea';
import 'flag-icon-css/css/flag-icons.css';
import { languageOptions } from '../../../../constants/app';
import LevelProgramFields from './LevelProgramFields';

function ProgramForm({ initialValues, submitAction }) {
  const onSubmit = async (values) => submitAction(values);


  const {
    setValue,
    control,
    getValues,
    register,
    update,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    keyName: 'objId',
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(createProgramSchema),
    defaultValues: initialValues,
  });

  const {
    fields: levelProgramsAttributes,
    append: appendLevelProgram,
    remove: removeLevelProgram,
    update: updateLevelProgram,
  } = useFieldArray({
    keyName: 'objId',
    control,
    name: 'level_programs_attributes',
  });

  const addLevelProgram = () => appendLevelProgram({
    program_id: initialValues?.id,
    level_id: undefined,
  });

  return (
    <FormProvider
      control={control}
      errors={errors}
      register={register}
      setValue={setValue}
      getValues={getValues}
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
                    showIcon
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
          </Card>
        </Col>
        {initialValues.id &&
          <Col>
            <LevelProgramFields
              levelProgramsAttributes={levelProgramsAttributes}
              removeLevelProgram={removeLevelProgram}
              addLevelProgram={addLevelProgram}
              updateLevelProgram={updateLevelProgram}
            />
          </Col>}
        <Col>
          <Card>
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
