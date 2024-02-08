import { atom } from "recoil";

const toggleMenuAtom = atom({
  key: 'toggleMenu',
  default: false
});

export default toggleMenuAtom;
