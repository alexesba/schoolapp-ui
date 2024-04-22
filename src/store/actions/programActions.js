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

  const getOneAsync = (programId) => {
    const [program, setProgram] = useState(null);

    useEffect(() => {
      const loadProgram = async () => {
        const promise = api.get(`${PROGRAM_URL}/${programId}`).then(({ data: { data } }) => data);

        setProgram(promiseWrapper(promise));
      };

      loadProgram();
    }, [programId]);

    return program;
  };

  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: programs, meta: pagination } } = await api.get(PROGRAM_URL, { params });

      return setPrograms({ programs, pagination });
    } catch (error) {
      alert.error(error.message);
      return error;
    }
  };

  const create = async (programParams) => {
    try {
      const { status, data: { data: program } } = await api.post(
        PROGRAM_URL,
        { program: programParams },
      );
      alert.success('The program has been created successfully');
      return { status, program };
    } catch (error) {
      alert.error(error.message);
      return error;
    }
  };

  const update = async (programParams) => {
    try {
      const { status, data: { data: program } } = await api.put(
        `${PROGRAM_URL}/${programParams.id}`,
        { program: programParams },
      );
      alert.success('The program has been updated successfully');
      return { status, program };
    } catch (error) {
      alert.error(error.message);
      return error;
    }
  };

  const destroy = async (programId) => {
    try {
      const { status } = await api.delete(`${PROGRAM_URL}/${programId}`);
      alert.success('The program has been deleted successfully');
      return status;
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
    create,
    destroy,
    getAll,
    getOneAsync,
    getProgramByIds,
    update,
  };
};

export default useProgramActions;
