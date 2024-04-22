import { useRecoilState } from 'recoil';
import levelsAtom from '../atoms/levelsAtom';
import { LEVEL_PROGRAM_URL } from '../../constants/api';
import useAxiosWrapper, { promiseWrapper } from '../../http/useAxiosWrapper';
import { useEffect, useState } from 'react';

const useLevelProgramActions = () => {
  const api = useAxiosWrapper();
  const [, setLevelPrograms] = useRecoilState(levelsAtom);

  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: levelPrograms, meta: pagination } } = await api.get(LEVEL_PROGRAM_URL, { params });

      return setLevelPrograms({ levelPrograms, pagination });
    } catch (error) {
      return error;
    }
  };


  const getOneAsync = (levelProgramId) => {
    const [levelProgram, setLevelProgram] = useState(null);

    useEffect(() => {
      const loadUser = async () => {
        let promise;

        if (levelProgramId) {
          promise = api.get(`${LEVEL_PROGRAM_URL}/${levelProgramId}`).then(({ data: { data } }) => data);
        } else {
          promise = new Promise((resolve) => { resolve(null); });
        }

        setLevelProgram(promiseWrapper(promise));
      };

      loadUser();
    }, [levelProgramId]);

    return levelProgram;
  };
  return {
    getAll,
    getOneAsync,
  };
};

export default useLevelProgramActions;
