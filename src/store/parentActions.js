import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { PARENT_URL } from '../constants/api';
import useAxiosWrapper, { promiseWrapper } from '../http/useAxiosWrapper';

/* const getAll = async (params = { page: 1 }) => {
  try {
    const { data: { data: students, meta: pagination } } = await api.get(PARENT_URL, { params });

    return setParents({ students, pagination });
  } catch (error) {
    return error;
  }
}; */

const useParentActions = () => {
  const api = useAxiosWrapper();

  const getOneAsync = (parentId) => {
    const [parent, setParent] = useState();

    useEffect(() => {
      const loadParent = async () => {
        const promise = api.get(`${PARENT_URL}/${parentId}`).then(({ data: { data } }) => data);
        setParent(promiseWrapper(promise));
      };

      loadParent();
    }, [parentId]);

    return parent;
  };

  return {
    // getAll,
    getOneAsync,
  };
};

export default useParentActions;
