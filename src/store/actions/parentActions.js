import { useEffect, useState } from 'react';
import { PARENT_URL } from '../../constants/api';
import useAxiosWrapper, { promiseWrapper } from '../../http/useAxiosWrapper';
import parentsAtom from '../atoms/parentsAtom';
import { useRecoilState } from 'recoil';

const useParentActions = () => {
  const api = useAxiosWrapper();
  const [, setParents] = useRecoilState(parentsAtom);

  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: parents, meta: pagination } } = await api.get(PARENT_URL, { params });

      return setParents({ parents, pagination });
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
          promise = api.get(`${PARENT_URL}/${parentId}`).then(({ data: { data } }) => data);
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

export default useParentActions;
