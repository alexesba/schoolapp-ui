import { atom } from 'recoil';

const coursesAtom = atom({
  key: 'courses',
  default: { courses: [], pagination: {} },
});

export default coursesAtom;
