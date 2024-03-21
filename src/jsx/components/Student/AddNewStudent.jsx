import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import { useRecoilValue } from 'recoil';
import Form from 'react-bootstrap/Form';
import {
  Controller, FormProvider, useFieldArray, useForm,
} from 'react-hook-form';
import { Card, Col, Row } from 'react-bootstrap';
import { IMAGES } from '../Dashboard/Content';
import useStudentActions from '../../../store/actions/studentActions';
import studentDetailsAtom from '../../../store/atoms/studentDetailsAtom';
import createStudentSchema from './validations/createStudent';
import Input from '../Forms/FormField/Input';
import InputDatePicker from '../Forms/FormField/InputDatePicker';

function AddNewStudent() {
  const { id: userId } = useParams();
  const { getOne } = useStudentActions();
  // const student = useRecoilValue(studentDetailsAtom);
  const [file, setFile] = useState(null);

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const RemoveFile = () => {
    setFile(null);
  };

  useEffect(() => {
    if (userId) {
      getOne(userId);
    }
  }, [userId]);

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
        user = { ...user, avatar: content };
      } catch (error) {
        console.log(error);
      }
    }
    console.log('FORM DATA', user);
  };

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(createStudentSchema),
    defaultValues: {
      email: null,
      date_of_birth: null,
      first_name: null,
      middle_name: null,
      last_name: null,
      mobile_phone: null,
      home_phone: null,
      addresses_attributes: [{
        street: null,
        state: null,
        city: null,
        zip: null,
      },
      ],
      parents_attributes: [{
        email: 'parent1@gmail.com',
        first_name: 'Pedro',
        home_phone: '3121026597',
        last_name: 'Paramo',
        middle_name: 'xx',
        mobile_phone: '3121026597',
        date_of_birth: '1984-03-16 02:08:19 UTC',
      },
      ],
    },
  });

  const {
    fields: studentAddressAtrributes, append: appendStudentAddress, remove: removeStudentAddress,
  } = useFieldArray({
    control,
    name: 'addresses_attributes',
  });

  const addStudentAddress = useCallback(() => appendStudentAddress({
    street: 'J Jesus de la mora',
    state: 'CHIS',
    city: 'Colima',
    zip: 28984,
  }), [appendStudentAddress]);

  const deleteStudentAddress = useCallback((index) => removeStudentAddress(index), [removeStudentAddress]);

  const {
    fields: parentsAtrributes, append: appendParent, remove: removeParent,
  } = useFieldArray({
    control,
    name: 'parents_attributes',
  });

  const addParent = useCallback(() => appendParent({
    email: 'parent1@gmail.com',
    first_name: 'Pedro',
    home_phone: '3121026597',
    last_name: 'Paramo',
    middle_name: 'xx',
    mobile_phone: '3121026597',
    date_of_birth: '1984-03-16 02:08:19 UTC',
  }), [appendParent]);

  const deleteParent = useCallback((index) => removeParent(index), [removeParent]);

  return (
    <FormProvider errors={errors} register={register} control={control}>
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
                          style={{ backgroundImage: file ? `url(${URL.createObjectURL(file)})` : `url(${IMAGES.noimage})` }}
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
                        <Row className="mb-3">
                          <Input
                            name="first_name"
                            label="First Name"
                            placeholder="First Name"
                          />
                        </Row>

                        <Row className="mb-3">
                          <Input
                            name="middle_name"
                            label="Middle Name"
                            placeholder="Middle Name"
                          />
                        </Row>

                        <Row className="mb-3">
                          <Input
                            name="email"
                            label="Email"
                            placeholder="hello@example.com"
                          />
                        </Row>
                      </Col>
                      <Col xl="6" sm="6">
                        <Row className="mb-3">
                          <Input
                            name="last_name"
                            placeholder="Last Name"
                            label="Last Name"
                          />
                        </Row>
                        <Row className="mb-3">
                          <Input
                            name="mobile_phone"
                            label="Phone Number"
                            placeholder="(312)123-176-3"
                          />
                        </Row>

                        <Row className="mb-3">
                          <InputDatePicker
                            name="date_of_birth"
                            label="Date of Birth"
                            placeholder="mm/dd/YY"
                          />
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </div>

                <Col xs="9" className="offset-md-3">
                  <Form.Label className="mb-0">
                    User'
                    {' '}
                    {studentAddressAtrributes.length > 1 ? 'Addresses' : 'Address'}
                  </Form.Label>
                  <hr />
                  {studentAddressAtrributes.map((field, index) => {
                    const addressErrors = errors.addresses_attributes || [];
                    const addressField = `addresses_attributes[${index}]`;
                    return (
                      <Row key={index}>
                        {index !== 0 && (<hr />)}
                        <Col xl="6" sm="6">
                          <Row className="mb-3">
                            <Input
                                name={`${addressField}.street`}
                              label="Street"
                              placeholder="Street"
                            />
                          </Row>
                          <Row className="mb-3">
                            <Input
                              name={`${addressField}.city`}
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
                                onClick={() => deleteStudentAddress(index)}
                              />
                            )}

                          <Row className="mb-3">
                            <Input
                              name={`${addressField}.state`}
                              placeholder="State"
                              label="State"
                            />
                          </Row>

                          <Row className="mb-3">
                            <Input
                              label="Zip Code"
                              placeholder="e.g: 28984"
                              name={`${addressField}.zip`}
                            />
                          </Row>
                        </Col>
                      </Row>
                    );
                  })}

                  <Row>
                    <button className="btn btn-default" onClick={addStudentAddress}>
                      Address
                      {' '}
                      <i className="bi bi-plus-circle-dotted" />
                    </button>
                  </Row>
                </Col>
              </div>
            </div>
          </div>
        </div>

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
                    <Row key={index}>
                      {index !== 0 && (<hr />)}
                      <Col xl="6" xm="6">
                        <Row className="mb-3">
                          <Input
                            name={`${parentFields}.first_name`}
                            label="First Name"
                            placeholder="First Name"
                          />
                        </Row>
                        <Row className="mb-3">
                          <Input
                            name={`${parentFields}.email`}
                            label="Email"
                            placeholder="hello@example.com"
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
                          />
                        </Row>
                        <Row className="mb-3">
                          <Input
                            name={`${parentFields}.mobile_phone`}
                            type="number"
                            label="Phone Number"
                            placeholder="+3123234682"
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

export default AddNewStudent;
