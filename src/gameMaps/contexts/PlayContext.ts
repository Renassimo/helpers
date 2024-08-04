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
  items: {},
  itemsList: [],
  visibleItems: [],
  choseAllCategories: () => {},
  clearAllChosenCategories: () => {},
  changeCategoryChoose: () => {},
  pointingCategoryId: null,
  setPointingCategoryId: () => {},
  quitFromCreatingNewItem: () => {},
  updateSubmittedCategory: () => {},
  isCategoryEditOpen: false,
  setIsCategoryEditOpen: () => {},
  editingCategory: null,
  openCategoryCreating: () => {},
  openCategoryUpdating: () => {},
  isItemEditOpen: false,
  setIsItemEditOpen: () => {},
  creatingItemCoordinates: null,
  editingItem: null,
  openItemCreating: () => {},
  openItemUpdating: () => {},
  updateSubmittedItem: () => {},
  relocateItem: () => {},
  relocatingItem: null,
  updateItemCoordinates: () => {},
});

export default PlayContext;
