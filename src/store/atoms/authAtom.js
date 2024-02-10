import { atom } from "recoil";
import { local } from "../localStorage";
import { APP_TOKEN_NAME } from "../../constants/session";

const authAtom = atom({
  key: 'auth',
  default: JSON.parse(local.getItem(APP_TOKEN_NAME) || '{}')
});

export default authAtom;
