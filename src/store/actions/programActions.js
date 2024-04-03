import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useAxiosWrapper, { promiseWrapper } from '../../http/useAxiosWrapper';
import { PROGRAM_URL } from '../../constants/api';
import programsAtom from '../atoms/programsAtom';
import useAlert from './useAlert';

const useProgramActions = () => {
  const api = useAxiosWrapper();
  const [, setPrograms] = useRecoilState(programsAtom);
  const alert = useAlert();

  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: programs, meta: pagination } } = await api.get(PROGRAM_URL, { params });

      return setPrograms({ programs, pagination });
    } catch (error) {
      alert.error(error.message);
      return error;
    }
  };

  const getProgramByIds = (programIds) => {
    const [subjects, setSubjects] = useState();

    useEffect(() => {
      const getSubjects = () => {
        let promise;

        if (programIds.length === 0) {
          promise = new Promise((resolve) => { resolve(null); });
        } else {
          promise = api.get(PROGRAM_URL, { params: { ids: programIds } }).then(
            ({ data: { data: programs, meta: pagination } }) => ({ programs, pagination }),
          );
        }
        setSubjects(promiseWrapper(promise));
      };

      getSubjects();
    }, []);

    return subjects;
  };

  return {
    getAll,
    getProgramByIds,
  };
};

export default useProgramActions;
