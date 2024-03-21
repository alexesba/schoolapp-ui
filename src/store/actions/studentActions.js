import { useRecoilState } from 'recoil';
import { STUDENT_URL } from '../../constants/api';
import useAxiosWrapper from '../../http/useAxiosWrapper';
import studentsAtom from '../atoms/studentsAtom';
import studentDetailsAtom from '../atoms/studentDetailsAtom';

const useStudentActions = () => {
  const api = useAxiosWrapper();
  const [data, setStudents] = useRecoilState(studentsAtom);
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

  const create = async (userParams) => {
    try {
      const { date: student } = await api.post(STUDENT_URL, { user: userParams });
      setStudents({ ...data, students: [student, ...data.students] });
    } catch (error) {
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
