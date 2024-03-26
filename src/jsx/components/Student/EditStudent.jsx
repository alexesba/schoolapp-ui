import { Suspense, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import useStudentActions from '../../../store/actions/studentActions';
import studentDetailsAtom from '../../../store/atoms/studentDetailsAtom';
import currentUserAtom from '../../../store/atoms/currentUserAtom';
import StudentForm from './Form/StudentForm';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';

const getParents = (student) => {
  if (!student?.id) return [{}];

  const parents = student?.relationships.parents.data.map(({ id }) => ({ id }));

  return parents.length > 0 ? parents : [{}];
};

const getAddresses = (student) => {
  if (!student?.id) return [{}];

  const addresses = student.relationships.addresses.data.map(({ id }) => ({ id }));

  return addresses.length > 0 ? addresses : [{}];
};
function EditStudent() {
  const { id: userId } = useParams();
  const { getOneAsync: getStudent, update } = useStudentActions();
  const student = getStudent(userId);
  const currentUser = useRecoilValue(currentUserAtom);
  const organizationId = currentUser?.organization_id;

  if (!student) return null;

  const initialValues = {
    id: student.id,
    organization_id: organizationId,
    email: student?.attributes?.email,
    date_of_birth: student?.attributes?.date_of_birth,
    first_name: student?.attributes?.first_name,
    middle_name: student?.attributes?.middle_name,
    last_name: student?.attributes?.last_name,
    mobile_phone: student?.attributes?.mobile_phone,
    gender: student?.attributes?.gender,
    home_phone: student?.attributes?.home_phone,
    avatar: student?.attributes?.avatar,
    addresses_attributes: getAddresses(student).map((address) => ({
      ...address,
      street: null,
      state: null,
      city: null,
      zip: null,
    })),
    parents_attributes: getParents(student).map((parent) => ({
      ...parent,
      email: '',
      gender: null,
      first_name: '',
      home_phone: '',
      last_name: '',
      middle_name: '',
      mobile_phone: '',
      date_of_birth: '',
      organization_id: organizationId,
    })),
  };

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <StudentForm initialValues={initialValues} />
    </Suspense>
  );
}

export default EditStudent;
