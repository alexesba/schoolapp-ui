import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import currentUserAtom from '../../../store/atoms/currentUserAtom';
import StudentForm from './Form/StudentForm';
import useStudentActions from '../../../store/actions/studentActions';

function AddNewStudent() {
  const currentUser = useRecoilValue(currentUserAtom);
  const organizationId = currentUser.organization_id;
  const { create } = useStudentActions();
  const navigate = useNavigate();

  const initialValues = {
    organization_id: organizationId,
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
      email: '',
      gender: null,
      first_name: '',
      home_phone: '',
      last_name: '',
      middle_name: '',
      mobile_phone: '',
      date_of_birth: '',
      organization_id: organizationId,
    },
    ],
  };

  const submitAction = async (userFormParams) => {
    const { status, student } = await create(userFormParams);

    if (status === 200) {
      navigate(`/students/${student.id}/edit`);
    }
  };

  return (
    <StudentForm
      initialValues={initialValues}
      submitAction={submitAction}
    />
  );
}

export default AddNewStudent;
