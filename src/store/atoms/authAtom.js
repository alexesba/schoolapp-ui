import { atom } from "recoil";
import { local } from "../localStorage";

const authAtom = atom({
  key: 'auth',
  default: JSON.parse(local.getItem("app:token") || '{}')
});

export default authAtom;
