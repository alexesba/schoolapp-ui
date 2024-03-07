import { useRecoilValue } from 'recoil';
import { isEmpty } from 'lodash';
import authAtom from '../atoms/authAtom';
import { local } from '../localStorage';
import { APP_TOKEN_NAME } from '../../constants/session';

const useSessionActions = () => {
  const auth = useRecoilValue(authAtom);

  const isLoggedIn = () => !isEmpty(auth);

  const removeSession = () => local.removeItem(APP_TOKEN_NAME);

  return {
    isLoggedIn,
    removeSession,
  };
};

export default useSessionActions;
