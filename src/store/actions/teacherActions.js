import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { TEACHER_URL } from '../../constants/api';
import useAxiosWrapper, { promiseWrapper } from '../../http/useAxiosWrapper';
import teachersAtom from '../atoms/teachersAtom';
import useAlert from './useAlert';

const useTeacherActions = () => {
  const api = useAxiosWrapper();
  const [, setParents] = useRecoilState(teachersAtom);
  const alert = useAlert();

  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: teachers, meta: pagination } } = await api.get(TEACHER_URL, { params });

      return setParents({ teachers, pagination });
    } catch (error) {
      return error;
    }
  };

  const destroy = async (teacherId) => {
    try {
      const { status } = await api.delete(`${TEACHER_URL}/${teacherId}`);
      alert.success('The teacher has been deleted successfully');
      return status;
    } catch (error) {
      alert.error(error.message);
      return error;
    }
  };

  const getOneAsync = (parentId) => {
    const [parent, setParent] = useState(null);

    useEffect(() => {
      const loadParent = async () => {
        let promise;
        if (parentId) {
          promise = api.get(`${TEACHER_URL}/${parentId}`).then(({ data: { data } }) => data);
        } else {
          promise = new Promise((resolve) => { resolve(null); });
        }
        setParent(promiseWrapper(promise));
      };

      loadParent();
    }, [parentId]);

    return parent;
  };

  return {
    getAll,
    destroy,
    getOneAsync,
  };
};

export default useTeacherActions;
