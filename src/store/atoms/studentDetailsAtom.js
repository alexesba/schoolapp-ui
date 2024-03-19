import { atom } from 'recoil';

const studentDetailsAtom = atom({
  key: 'studentDetails',
  default: {},
});

export default studentDetailsAtom;
