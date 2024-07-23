import { createContext } from 'react';

import { PlayContextData } from '@/gameMaps/types';

const PlayContext = createContext<PlayContextData>({
  game: null,
  play: null,
  updateSubmittedPlay: () => {},
  isPlayEditOpen: false,
  setIsPlayEditOpen: () => {},
  categories: null,
  items: null,
});

export default PlayContext;
