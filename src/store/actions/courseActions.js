import { useRecoilState } from 'recoil';
import coursesAtom from '../atoms/courseAtom';
import { COURSE_URL } from '../../constants/api';
import useAxiosWrapper from '../../http/useAxiosWrapper';

const useCourseActions = () => {
  const api = useAxiosWrapper();
  const [, setCourses] = useRecoilState(coursesAtom);
  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: courses, meta: pagination } } = await api.get(COURSE_URL, { params });

      return setCourses({ courses, pagination });
    } catch (error) {
      return error;
    }
  };
  return { getAll };
};

export default useCourseActions;
