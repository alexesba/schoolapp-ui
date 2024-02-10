import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../constants/api";
import { HOME_PATH, LOGIN_PATH } from "../../constants/app";
import useAxiosWrapper from "../../http/useAxiosWrapper"
import { useRecoilState } from "recoil";
import authAtom from "../atoms/authAtom";
import { local } from "../localStorage";
import { APP_TOKEN_NAME } from "../../constants/session";

const useAuthActions = () => {
  const api = useAxiosWrapper();
  const navigate = useNavigate();
  const [, setAuth] = useRecoilState(authAtom)

  const loginAction = async (payload) => {
    try {
      const response = await api.post(LOGIN_URL, payload)
      if (response.status == 200) {
        return navigate(HOME_PATH, { replace: true });
      }
    } catch (error) {
      console.warn('useAuthActions', error);
    }
  }

  const logoutAction = () => {
    local.removeItem(APP_TOKEN_NAME)
    setAuth(null);
  }
  return { loginAction, logoutAction }
}

export default useAuthActions;
