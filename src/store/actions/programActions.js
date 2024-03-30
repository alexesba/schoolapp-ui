import { useEffect, useState } from 'react';
import useAxiosWrapper, { promiseWrapper } from '../../http/useAxiosWrapper';
import { PROGRAM_URL } from '../../constants/api';

const useProgramActions = () => {
  const api = useAxiosWrapper();

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
    getProgramByIds,
  };
};

export default useProgramActions;
