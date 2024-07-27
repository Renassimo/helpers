import { createContext } from 'react';

import { PlayContextData } from '@/gameMaps/types';

const PlayContext = createContext<PlayContextData>({
  game: null,
  play: null,
  updateSubmittedPlay: () => {},
  isPlayEditOpen: false,
  setIsPlayEditOpen: () => {},
  categories: {},
  categoriesList: [],
  isEveryCategoryChosen: true,
  isNoCategoriesChosen: false,
  items: [],
  visibleItems: [],
  choseAllCategories: () => {},
  clearAllChosenCategories: () => {},
  changeCategoryChoose: () => {},
  pointingCategoryId: null,
  setPointingCategoryId: () => {},
  quitFromCreatingNewItem: () => {},
});

export default PlayContext;
