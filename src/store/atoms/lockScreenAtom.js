import { atom } from 'recoil';
import { local } from '../localStorage';
import { LOCK_SCREEN_TOKEN } from '../../constants/session';

const lockScreenAtom = atom({
  key: 'lockScreen',
  default: Boolean(JSON.parse(local.getItem(LOCK_SCREEN_TOKEN)) || false),
});

export default lockScreenAtom;
