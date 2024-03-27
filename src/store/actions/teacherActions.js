import { useEffect, useState } from 'react';
import { TEACHER_URL } from '../../constants/api';
import useAxiosWrapper, { promiseWrapper } from '../../http/useAxiosWrapper';
import teachersAtom from '../atoms/teachersAtom';
import { useRecoilState } from 'recoil';

const useTeacherActions = () => {
  const api = useAxiosWrapper();
  const [, setParents] = useRecoilState(teachersAtom);

  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: teachers, meta: pagination } } = await api.get(TEACHER_URL, { params });

      return setParents({ teachers, pagination });
    } catch (error) {
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
    getOneAsync,
  };
};

export default useTeacherActions;
