import { useRecoilState } from 'recoil';
// import { toast } from 'react-toastify';
import { STUDENT_URL } from '../../constants/api';
import useAxiosWrapper from '../../http/useAxiosWrapper';
import studentsAtom from '../atoms/studentsAtom';
import studentDetailsAtom from '../atoms/studentDetailsAtom';
import useAlert from './useAlert';

const useStudentActions = () => {
  const api = useAxiosWrapper();
  const [data, setStudents] = useRecoilState(studentsAtom);
  const [, setStudetDetails] = useRecoilState(studentDetailsAtom);
  const alert = useAlert();

  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: students, meta: pagination } } = await api.get(STUDENT_URL, { params });

      return setStudents({ students, pagination });
    } catch (error) {
      return error;
    }
  };

  const getOne = async (userId) => {
    try {
      const { data: { data: student } } = await api.get(`${STUDENT_URL}/${userId}`);
      alert.success('The student has been loaded successfully');
      /* toast.success('The student has been loaded successfully !', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      }); */
      return setStudetDetails(student);
    } catch (error) {
      alert.error(error.message);
      return error;
    }
  };

  const create = async (userParams) => {
    try {
      const { data: { data: student } } = await api.post(STUDENT_URL, { user: userParams });
      setStudents({ ...data, students: [student, ...data.students] });
      alert.success('The student has been created successfully');
    } catch (error) {
      alert.error(error.message);
      console.log(error);
    }
  };

  return {
    getAll,
    getOne,
    create,
  };
};

export default useStudentActions;
