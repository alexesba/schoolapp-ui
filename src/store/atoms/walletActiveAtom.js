import { atom } from "recoil";

const walletActiveAtom = atom({
  key: 'walletActive',
  default: false,
});

export default walletActiveAtom;
