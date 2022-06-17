import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const userAtom = atom({
  key: 'user',
  default: {
    isAuthenticated: false,
    user: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export default userAtom;
