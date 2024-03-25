import { atom } from 'recoil';

const currentUserAtom = atom({
  key: 'currentUser',
  default: null,
});

export default currentUserAtom;
