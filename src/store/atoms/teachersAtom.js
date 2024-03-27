import { atom } from 'recoil';

const teachersAtom = atom({
  key: 'teachers',
  default: { teachers: [], pagination: {} },
});

export default teachersAtom;
