import { atom } from 'recoil';

const parentsAtom = atom({
  key: 'parents',
  default: { parents: [], pagination: {} },
});

export default parentsAtom;
