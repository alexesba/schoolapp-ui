import { useRecoilState } from 'recoil';
import { STUDENT_URL } from '../../constants/api';
import useAxiosWrapper from '../../http/useAxiosWrapper';
import studentsAtom from '../atoms/studentsAtom';
import studentDetailsAtom from '../atoms/studentDetailsAtom';

const useStudentActions = () => {
  const api = useAxiosWrapper();
  const [, setStudents] = useRecoilState(studentsAtom);
  const [, setStudetDetails] = useRecoilState(studentDetailsAtom);
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
      return setStudetDetails(student);
    } catch (error) {
      return error;
    }
  };

  return {
    getAll,
    getOne,
  };
};

export default useStudentActions;
