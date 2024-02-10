import { useRecoilValue } from "recoil"
import authAtom from "../atoms/authAtom"
import { isEmpty } from "lodash";

const useSessionActions = () => {
  const auth = useRecoilValue(authAtom);

  const isLoggedIn = () =>  !isEmpty(auth);

  const removeSession = () => local.removeItem(APP_TOKEN_NAME);

  return {
    isLoggedIn,
    removeSession
  }
}

export default useSessionActions;
