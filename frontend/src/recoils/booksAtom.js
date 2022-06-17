import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const booksAtom = atom({
  key: 'books',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default booksAtom;
