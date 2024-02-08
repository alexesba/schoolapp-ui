import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../constants/api";
import { HOME_PATH, LOGIN_PATH } from "../../constants/app";
import useAxiosWrapper from "../../http/useAxiosWrapper"

const useAuthActions = () => {
  const api = useAxiosWrapper();
  const navigate = useNavigate();

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

  const logoutAction = async (payload) => {
    try {
      const response = await api.post(LOGIN_URL, payload)
      if (response.status == 200) return navigate(LOGIN_PATH, { replace: true });
    } catch (error) {
      console.warn('useAuthActions', error);
    }
  }
  return { loginAction, logoutAction }
}

export default useAuthActions;
