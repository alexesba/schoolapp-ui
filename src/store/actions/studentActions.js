import { useRecoilState } from 'recoil';
import { STUDENT_URL } from '../../constants/api';
import useAxiosWrapper from '../../http/useAxiosWrapper';
import studentsAtom from '../atoms/studentsAtom';

const useStudentActions = () => {
  const api = useAxiosWrapper();
  const [, setStudents] = useRecoilState(studentsAtom);
  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: students, meta: pagination } } = await api.get(STUDENT_URL, { params });

      return setStudents({ students, pagination });
    } catch (error) {
      return error;
    }
  };

  return {
    getAll,
  };
};

export default useStudentActions;
