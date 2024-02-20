import { atom } from "recoil";

const studentsAtom = atom({
  key: 'students',
  default:{ students: [], pagination: {}}
})

export default studentsAtom;
