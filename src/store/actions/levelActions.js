import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import levelsAtom from '../atoms/levelsAtom';
import { LEVEL_URL } from '../../constants/api';
import useAxiosWrapper from '../../http/useAxiosWrapper';

const useLevelActions = () => {
  const [, setLevels] = useRecoilState(levelsAtom);
  const api = useAxiosWrapper();

  const getAll = async (params = { page: 1 }) => {
    try {
      const { data: { data: levels, meta: pagination } } = await api.get(LEVEL_URL, { params });

      return setLevels({ levels, pagination });
    } catch (error) {
      return error;
    }
  };

  return {
    getAll,
  };
};

export default useLevelActions;
