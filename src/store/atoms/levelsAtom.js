import { atom } from 'recoil';

const levelsAtom = atom({
  key: 'levels',
  default: { levels: [], pagination: {} },
});

export default levelsAtom;
