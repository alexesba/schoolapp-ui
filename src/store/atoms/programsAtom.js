import { atom } from 'recoil';

const programsAtom = atom({
  key: 'programs',
  default: { programs: [], pagination: {} },
});

export default programsAtom;
