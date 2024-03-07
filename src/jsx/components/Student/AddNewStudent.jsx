import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useRecoilValue } from 'recoil';
import Form from 'react-bootstrap/Form';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { IMAGES } from '../Dashboard/Content';
import useStudentActions from '../../../store/actions/studentActions';
import studentDetailsAtom from '../../../store/atoms/studentDetailsAtom';

function AddNewStudent() {
  const { id: userId } = useParams();
  const { getOne } = useStudentActions();
  const student = useRecoilValue(studentDetailsAtom);
  const [file, setFile] = useState(null);
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };
  const RemoveFile = () => {
    setFile(null);
  };

  const [startDate, setStartDate] = useState(new Date());
  const onChange = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    if (userId) {
      getOne(userId);
    }
  }, [userId]);

  const onSubmit = (values) => console.log(values);
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: null,
      email: null,
      address: {
        state: 'CHIS',
        city: null,
      },
    },
  });

  const {
    fields, append, prepend, remove, swap, move, insert,
  } = useFieldArray({
    control,
    name: 'address',
  });

  async function getBase64(selectedFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  useEffect(async() => {
    let content = '';
    if (file) {
      try {
        content = await (await getBase64(file));
      } catch(error) {
        console.log(error);
      }
    }
  }, [file]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Student Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-3 col-lg-4">
                  <label className="form-label text-primary">
                    Photo
                    <span className="required">*</span>
                  </label>
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
                <div className="col-xl-9 col-lg-8">
                  <div className="row">
                    <div className="col-xl-6 col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="first_name" className="form-label text-primary">
                          First Name
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="James"
                          {...register('first_name')}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-primary">
                          Date & Place of Birth
                          <span className="required">*</span>
                        </label>
                        <div className="d-flex">
                          <Controller
                            name="date_of_birth"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                className="form-control"
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                              />
                            )}
                          />
                          <input
                            type="text"
                            {...register('address.state')}
                            className="form-control w-50 ms-3"
                            placeholder="CDMX"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label text-primary">
                          Email
                          <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          name="email"
                          className="form-control"
                          placeholder="hello@example.com"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label text-primary">
                          Address
                          <span className="required">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          {...register('address.street')}
                          rows="6"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput4" className="form-label text-primary">
                          Last Name
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Wally"
                          {...register('last_name')}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput5" className="form-label text-primary">
                          Parent Name
                          <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" id="exampleFormControlInput5" placeholder="Mana William" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput6" className="form-label text-primary">
                          Phone Number
                          <span className="required">*</span>
                        </label>
                        <input type="number" className="form-control" id="exampleFormControlInput6" placeholder="+123456789" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Parents Details</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-6 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput8" className="form-label text-primary">
                    First Name
                    <span className="required">*</span>
                  </label>
                  <input type="text" className="form-control" id="exampleFormControlInput8" placeholder="Mana" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput9" className="form-label text-primary">
                    Email
                    <span className="required">*</span>
                  </label>
                  <input type="email" className="form-control" id="exampleFormControlInput9" placeholder="hello@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea2" className="form-label text-primary">
                    Address
                    <span className="required">*</span>
                  </label>
                  <textarea className="form-control" id="exampleFormControlTextarea2" rows="6" />
                </div>
              </div>
              <div className="col-xl-6 col-sm-6">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput10" className="form-label text-primary">
                    Last Name
                    <span className="required">*</span>
                  </label>
                  <input type="text" className="form-control" id="exampleFormControlInput10" placeholder="Wick" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput11" className="form-label text-primary">
                    Phone Number
                    <span className="required">*</span>
                  </label>
                  <input type="number" className="form-control" id="exampleFormControlInput11" placeholder="+123456789" />
                </div>
                <label className="form-label text-primary">
                  Payments
                  <span className="required">*</span>
                </label>
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
              </div>
            </div>
            <div className="">
              <button type="button" className="btn btn-outline-primary me-3">Save as Draft</button>
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default AddNewStudent;
