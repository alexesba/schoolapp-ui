import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { LOGIN_URL, VALIDATE_TOKEN_URL } from '../../constants/api';
import { HOME_PATH } from '../../constants/app';
import useAxiosWrapper, { promiseWrapper } from '../../http/useAxiosWrapper';
import authAtom from '../atoms/authAtom';
import currentUserAtom from '../atoms/currentUserAtom';
import { local } from '../localStorage';
import { APP_TOKEN_NAME, LOCK_SCREEN_TOKEN } from '../../constants/session';
import lockScreenAtom from '../atoms/lockScreenAtom';

const useAuthActions = () => {
  const api = useAxiosWrapper();
  const navigate = useNavigate();
  const [, setAuth] = useRecoilState(authAtom);
  const [, setCurrrentUser] = useRecoilState(currentUserAtom);
  const [, setLockScreen] = useRecoilState(lockScreenAtom);

  const loginAction = async (payload) => {
    try {
      const response = await api.post(LOGIN_URL, payload);
      if (response.status === 200) {
        const { data: { data: currentUser } } = response;
        setCurrrentUser(currentUser);
        navigate(HOME_PATH, { replace: true });
      }
    } catch (error) {
      console.warn('useAuthActions', error);
    }
  };

  const unlockScreenAction = async (payload) => {
    try {
      const response = await api.post(LOGIN_URL, payload);
      if (response.status === 200) {
        local.removeItem(LOCK_SCREEN_TOKEN);
        setLockScreen(false);
      }
    } catch (error) {
      console.warn('useAuthActions', error);
    }
  };

  const logoutAction = () => {
    local.removeItem(APP_TOKEN_NAME);
    setAuth(null);
  };

  const loadCurrentUserBytoken = () => {
    const [, setUser] = useState();
    useEffect(() => {
      const verify = async () => {
        const promise = api.get(VALIDATE_TOKEN_URL).then(({ data: { data } }) => {
          setCurrrentUser(data);
          return data;
        });

        setUser(promiseWrapper(promise));
      };

      verify();
    }, []);
  };

  return {
    loginAction, logoutAction, loadCurrentUserBytoken, unlockScreenAction,
  };
};

export default useAuthActions;
