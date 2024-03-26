import {
  useCallback, useEffect, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import { useRecoilValue } from 'recoil';
import Form from 'react-bootstrap/Form';
import {
  FormProvider, useFieldArray, useForm,
} from 'react-hook-form';
import { Card, Col, Row } from 'react-bootstrap';
import { IMAGES } from '../../Dashboard/Content';
import useStudentActions from '../../../../store/actions/studentActions';
import createStudentSchema from '../validations/createStudent';
import Input from '../../Forms/FormField/Input';
import InputDatePicker from '../../Forms/FormField/InputDatePicker';
import SelectInput from '../../Forms/FormField/SelectInput';
import currentUserAtom from '../../../../store/atoms/currentUserAtom';
import UserAddress from './UserAddress';

const ROLE_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

function StudentForm({ initialValues }) {
  const { avatar } = initialValues;
  const { create } = useStudentActions();
  const [file, setFile] = useState(null);

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const RemoveFile = () => {
    setFile(null);
  };

  function getBase64(selectedFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  const onSubmit = async (values) => {
    let user = { ...values };
    let content = '';
    if (file) {
      try {
        content = await getBase64(file);
        user = { ...user, avatar: { data: content } };
      } catch (error) {
        console.log(error);
      }
    }
    create(user);
  };

  const {
    setValue,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(createStudentSchema),
    defaultValues: initialValues,
  });

  const {
    fields: studentAddressAtrributes,
    append: appendStudentAddress,
    remove: removeStudentAddress,
    update: updateStudentAddress,
  } = useFieldArray({
    keyName: 'objId',
    control,
    name: 'addresses_attributes',
  });

  const addStudentAddress = useCallback(() => appendStudentAddress({
    street: '',
    state: '',
    city: '',
    zip: null,
  }), [appendStudentAddress]);

  const deleteStudentAddress = useCallback((index) => removeStudentAddress(index), [removeStudentAddress]);

  const {
    fields: parentsAtrributes, append: appendParent, remove: removeParent,
  } = useFieldArray({
    keyName: 'objId',
    control,
    name: 'parents_attributes',
  });

  const addParent = useCallback(() => appendParent({
    email: '',
    first_name: '',
    home_phone: '',
    last_name: '',
    middle_name: '',
    mobile_phone: '',
    date_of_birth: '',
  }), [appendParent]);

  const deleteParent = useCallback((index) => removeParent(index), [removeParent]);

  return (
    <FormProvider setValue={setValue} errors={errors} register={register} control={control}>
      <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <Card.Header className="card-header">
                <Card.Title>Student Details</Card.Title>
              </Card.Header>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-3 col-lg-4">
                    <Form.Label className="form-label text-primary">
                      Photo
                      <span className="required">*</span>
                    </Form.Label>
                    <div className="avatar-upload">
                      <div className="avatar-preview">
                        <div
                          id="imagePreview"
                          style={{ backgroundImage: file ? `url(${URL.createObjectURL(file)})` : `url(${avatar || IMAGES.noimage})` }}
                        />
                      </div>
                      <div className="change-btn mt-2 mb-lg-0 mb-3">
                        <input type="file" className="form-control d-none" onChange={fileHandler} id="imageUpload" accept=".png, .jpg, .jpeg" />
                        <label htmlFor="imageUpload" className="dlab-upload mb-0 btn btn-primary btn-sm">Choose File</label>
                        <Link to="#" className="btn btn-danger light remove-img ms-2 btn-sm" onClick={RemoveFile}>Remove</Link>
                      </div>
                    </div>
                  </div>
                  <Col xl="9" lg="8">
                    <Row>
                      <Col xl="6" sm="6">
                        <Input name="organization_id" hidden />
                        <Input name="id" hidden />
                        <Row className="mb-3">
                          <Input
                            name="first_name"
                            label="First Name"
                            placeholder="First Name"
                            required
                          />
                        </Row>

                        <Row className="mb-3">
                          <Input
                            name="middle_name"
                            label="Middle Name"
                            placeholder="Middle Name"
                            required
                          />
                        </Row>

                        <Row className="mb-3">
                          <Input
                            name="email"
                            label="Email"
                            placeholder="hello@example.com"
                            required
                          />
                        </Row>
                      </Col>
                      <Col xl="6" sm="6">
                        <Row className="mb-3">
                          <Input
                            name="last_name"
                            placeholder="Last Name"
                            label="Last Name"
                            required
                          />
                        </Row>
                        <Row className="mb-3">
                          <Input
                            name="mobile_phone"
                            label="Phone Number"
                            placeholder="(312)123-176-3"
                            required
                          />
                        </Row>

                        <Row className="mb-3">
                          <InputDatePicker
                            name="date_of_birth"
                            label="Date of Birth"
                            placeholder="mm/dd/YY"
                            required
                          />
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl="9" className="offset-md-3">
                    <Row>
                      <Col xl="6" sm="6">
                        <Row className="mb-3">
                          <SelectInput
                            name="gender"
                            label="Gender"
                            className="form-control"
                            placeholder="Select an option"
                            options={ROLE_OPTIONS}
                            required
                          />
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Col xl="12">
          <Card>
            <Card.Header>
              <Card.Title>
                {studentAddressAtrributes.length > 1 ? 'Addresses' : 'Address'}
                {' '}
                Details
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Label className="mb-0">
                User'
                {' '}
                {studentAddressAtrributes.length > 1 ? 'Addresses' : 'Address'}
              </Form.Label>
              <hr />
              {studentAddressAtrributes.map((field, index) => (
                <UserAddress
                  key={field.objId}
                  field={field}
                  index={index}
                  remove={deleteStudentAddress}
                />
              ))}

              <Row>
                <button type="button" className="btn btn-default" onClick={addStudentAddress}>
                  Address
                  {' '}
                  <i className="bi bi-plus-circle-dotted" />
                </button>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col xl="12">
          <Card>
            <Card.Header>
              <Card.Title>
                {parentsAtrributes.length > 1 ? 'Parents' : 'Parent'}
                {' '}
                Details
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {
                parentsAtrributes.map((field, index) => {
                  const parentFields = `parents_attributes[${index}]`;
                  return (
                    <Row key={field.objId}>
                      {index !== 0 && (<hr />)}
                      <Col xl="6" xm="6">
                        <Row className="mb-3">
                          <Input
                            label="id"
                            name={`${parentFields}.id`}
                            hidden
                          />
                          <Input
                            label="organization_id"
                            name={`${parentFields}.organization_id`}
                            hidden
                          />
                          <Input
                            name={`${parentFields}.first_name`}
                            label="First Name"
                            placeholder="First Name"
                            required
                          />
                        </Row>
                        <Row className="mb-3">
                          <Input
                            name={`${parentFields}.email`}
                            label="Email"
                            placeholder="hello@example.com"
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
                      </Col>
                      <div className="col-xl-6 col-sm-6 position-relative">
                        {index !== 0
                          && (
                            <i
                              className="bi bi-x-circle position-absolute end-0 cursor-pointer pl-10"
                              onClick={() => deleteParent(index)}
                            />
                          )}
                        <Row className="mb-3">
                          <Input
                            name={`${parentFields}.last_name`}
                            placeholder="Last Name"
                            label="Last Name"
                            required
                          />
                        </Row>
                        <Row className="mb-3">
                          <Input
                            name={`${parentFields}.mobile_phone`}
                            type="number"
                            label="Phone Number"
                            placeholder="+3123234682"
                            required
                          />
                        </Row>

                        <Row className="mb-3">
                          <SelectInput
                            name={`${parentFields}.gender`}
                            label="Gender"
                            className="form-control"
                            placeholder="Select an option"
                            options={ROLE_OPTIONS}
                            required
                          />
                        </Row>
                      </div>
                    </Row>
                  );
                })
              }
              <Row>
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={addParent}
                >
                  Parent
                  {' '}
                  <i className="bi bi-plus-circle-dotted" />
                </button>
              </Row>
              <div className="d-flex flex-row-reverse">
                <button className="btn btn-primary" type="submit">Save</button>
                <button type="reset" className="btn btn-outline-primary me-3">Cancel</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Form>
    </FormProvider>
  );
}

export default StudentForm;
