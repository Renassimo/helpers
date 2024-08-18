import { createContext } from 'react';

import { PlayContextData } from '@/gameMaps/types';

const PlayContext = createContext<PlayContextData>({
  game: null,
  // Play data
  play: null,
  updateSubmittedPlay: () => {},
  isPlayEditOpen: false,
  setIsPlayEditOpen: () => {},
  // Items data
  items: {},
  itemsList: [],
  // Categories data
  categories: {},
  categoriesList: [],
  visibleItems: [],
  choseAllCategories: () => {},
  clearAllChosenCategories: () => {},
  changeCategoryChoose: () => {},
  isEveryCategoryChosen: true,
  isNoCategoriesChosen: false,
  toggleFullyCollected: () => {},
  categoryFilterQuery: '',
  setCategoryFilterQuery: () => {},
  // Category creating and editing
  isCategoryEditOpen: false,
  setIsCategoryEditOpen: () => {},
  editingCategory: null,
  openCategoryCreating: () => {},
  openCategoryUpdating: () => {},
  updateSubmittedCategory: () => {},
  clearCategoryEditing: () => {},
  // Item creating and updating
  isItemEditOpen: false,
  creatingItemCoordinates: null,
  pointingCategoryId: null,
  editingItem: null,
  setPointingCategoryId: () => {},
  setIsItemEditOpen: () => {},
  openItemCreating: () => {},
  openItemUpdating: () => {},
  updateSubmittedItem: () => {},
  quitFromCreatingNewItem: () => {},
  clearItemEditing: () => {},
  // Updating item coordinates
  relocateItem: () => {},
  relocatingItem: null,
  updateItemCoordinates: () => {},
  // Updating item collection
  updateItemCollection: () => {},
  itemCollectionUpdating: false,
});

export default PlayContext;
