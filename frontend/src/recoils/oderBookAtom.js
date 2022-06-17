import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const orderBookAtom = atom({
  key: 'orderBooks',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default orderBookAtom;
