import { atom } from 'recoil';

const alertContainerAtom = atom({
  key: 'alertContainer',
  default: { show: false, message: null },
});

export default alertContainerAtom;
