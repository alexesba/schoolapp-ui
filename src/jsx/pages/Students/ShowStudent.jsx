import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { IMAGES, SVGICON } from '../../components/Dashboard/Content';
import PaymentHistoryTable from '../../components/Student/PaymentHistoryTable';
import noimage from '../../../images/no-img-avatar.png';

import profile from '../../../images/profile.svg';
import location from '../../../images/svg/location.svg';
import phone from '../../../images/svg/phone.svg';
import email from '../../../images/svg/email.svg';
import useStudentActions from '../../../store/actions/studentActions';
import studentDetailsAtom from '../../../store/atoms/studentDetailsAtom';
import StudentDetailsItem from '../../components/Student/StudentDetailsItem';

const scheduleBlog = [
  {
    title: 'Basic Algorithm', subtitle: 'Algorithm', image: IMAGES.avat1, color: 'schedule-card',
  },
  {
    title: 'Basic Art', subtitle: 'Art', image: IMAGES.avat2, color: 'schedule-card-1',
  },
  {
    title: 'React & Scss', subtitle: 'Programming', image: IMAGES.avat3, color: 'schedule-card-2',
  },
  {
    title: 'Simple Past Tense', subtitle: 'English', image: IMAGES.avat4, color: 'schedule-card-3',
  },
];

function StudentDetails() {
  const { id: userId } = useParams();
  const { getOne } = useStudentActions();

  const [studentDetailsValue, setStudentDetailsValue] = useRecoilState(studentDetailsAtom);

  const { attributes: currentStudent = {}, relationships = {} } = studentDetailsValue;

  useEffect(() => {
    if (userId) {
      getOne(userId);
    }

    return () => setStudentDetailsValue({});
  }, [userId]);

  return (
    <div className="row">
      <div className="col-xl-9">
        <div className="card h-auto">
          <div className="card-header p-0">
            <div className="user-bg w-100">
              <div className="user-svg">
                <svg width="264" height="109" viewBox="0 0 264 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.0107422" y="0.6521" width="263.592" height="275.13" rx="20" fill="#FCC43E" />
                </svg>
              </div>
              <div className="user-svg-1">
                <svg width="264" height="59" viewBox="0 0 264 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.564056" width="263.592" height="275.13" rx="20" fill="#FB7D5B" />
                </svg>

              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="user">
                <div className="user-media">
                  <img src={currentStudent.avatar || noimage} alt="" className="avatar avatar-xxl" />
                </div>
                <div>
                  <h2 className="mb-0">{`${currentStudent.first_name}${currentStudent.middle_name ? `${currentStudent.first_name} ` : ' '}${currentStudent.last_name}`}</h2>
                  <p className="text-primary font-w600">Student</p>
                </div>
              </div>
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn ">
                  {SVGICON.dots}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end" align="end">
                  <Link to={`/students/${currentStudent.id}/edit`} className="dropdown-item">Edit </Link>
                  <Dropdown.Item onClick={() => console.log('delete', currentStudent)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="row mt-2">
              <StudentDetailsItem
                image={profile}
                title="Parents"
                subtitle={
                  <>
                    {currentStudent?.parent_names?.map((name, key) => {
                      const parent = relationships?.parents?.data[key];
                      return (parent ?
                        <>
                          {key >= 1 ? <br /> : null}
                          <Link to={`/parents/${parent.id}`}>
                            {name}
                          </Link>
                        </> : null
                      );
                    })
                    }
                  </>
                } />
              <StudentDetailsItem
                image={location}
                title="Address"
                subtitle={currentStudent.address}
              />
              <StudentDetailsItem
                image={phone}
                title="Phone"
                subtitle={currentStudent.mobile_phone}
              />
              <StudentDetailsItem
                image={email}
                title="Email"
                subtitle={currentStudent.email}
              />
            </div>
          </div>
        </div>
        <div className="card h-auto">
          <div className="card-header border-0 p-3">
            <h4 className="heading mb-0">Payment History</h4>
          </div>
          <div className="card-body p-0">
            <PaymentHistoryTable />
          </div>
        </div>
      </div>
      <div className="col-xl-3">
        <div className="row">
          <div className="col-xl-12">
            <div className="card h-auto">
              <div className="card-body">
                <h3 className="heading">Schedule Details</h3>
                <p className="mb-0">Thursday, 10th April , 2022</p>
              </div>
            </div>
          </div>
          {scheduleBlog.map((data, index) => (
            <div className="col-xl-12 col-sm-6" key={index}>
              <div className={`card h-auto ${data.color}`}>
                <div className="card-body">
                  <h4 className="mb-0">{data.title}</h4>
                  <p>{data.subtitle}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <ul>
                        <li className="mb-2">
                          {SVGICON.calndar}
                          {' '}
                          July 20, 2023
                        </li>
                        <li>
                          {SVGICON.watch}
                          {' '}
                          09.00 - 10.00 AM
                        </li>
                      </ul>
                    </div>
                    <div>
                      <img src={data.image} className="avatar avatar-lg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-xl-12">
            <Link to="#" className="btn btn-primary btn-block light btn-rounded mb-5">View More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
