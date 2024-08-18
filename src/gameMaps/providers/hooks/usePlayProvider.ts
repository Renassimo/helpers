import { PlayContextData, PlayPageData } from '@/gameMaps/types';

import usePlayData from './subhooks/usePlayData';
import useCategoriesData from './subhooks/useCategoriesData';
import useCreateUpdateCategory from './subhooks/useCreateUpdateCategory';
import useItemsData from './subhooks/useItemsData';
import useCreateUpdateItem from './subhooks/useCreateUpdateItem';
import useUpdateItemCoordinates from './subhooks/useUpdateItemCoordinates';
import useUpdateItemCollection from './subhooks/useUpdateItemCollection';

const usePlayProvider = (data: PlayPageData | null): PlayContextData => {
  const {
    gameData: game = null,
    playData = null,
    categoriesData = [],
    itemsData = [],
  } = data ?? {};

  // Play data
  const { play, updateSubmittedPlay, isPlayEditOpen, setIsPlayEditOpen } =
    usePlayData(game, playData);

  // Items data
  const { items, itemsList, updateItem } = useItemsData(itemsData);

  // Categories data
  const {
    categories,
    updateCategory,
    recountCategories,
    categoriesList,
    visibleItems,
    choseAllCategories,
    clearAllChosenCategories,
    changeCategoryChoose,
    isEveryCategoryChosen,
    isNoCategoriesChosen,
    toggleFullyCollected,
    categoryFilterQuery,
    setCategoryFilterQuery,
  } = useCategoriesData(categoriesData, itemsList);

  // Category creating and editing
  const {
    isCategoryEditOpen,
    setIsCategoryEditOpen,
    editingCategory,
    openCategoryCreating,
    openCategoryUpdating,
    updateSubmittedCategory,
    clearCategoryEditing,
  } = useCreateUpdateCategory(categories, updateCategory);

  // Item creating and updating
  const {
    isItemEditOpen,
    creatingItemCoordinates,
    pointingCategoryId,
    editingItem,
    setPointingCategoryId,
    setIsItemEditOpen,
    openItemCreating,
    openItemUpdating,
    updateSubmittedItem,
    quitFromCreatingNewItem,
    clearItemEditing,
  } = useCreateUpdateItem(items, updateItem, recountCategories);

  // Updating item coordinates
  const { relocateItem, relocatingItem, updateItemCoordinates } =
    useUpdateItemCoordinates(
      game,
      play,
      items,
      setPointingCategoryId,
      updateSubmittedItem
    );

  // Updating item collection
  const { updateItemCollection, loading: itemCollectionUpdating } =
    useUpdateItemCollection(game, play, updateSubmittedItem);

  return {
    game,
    // Play data
    play,
    updateSubmittedPlay,
    isPlayEditOpen,
    setIsPlayEditOpen,
    // Items data
    items,
    itemsList,
    // Categories data
    categories,
    categoriesList,
    visibleItems,
    isEveryCategoryChosen,
    isNoCategoriesChosen,
    choseAllCategories,
    clearAllChosenCategories,
    changeCategoryChoose,
    toggleFullyCollected,
    categoryFilterQuery,
    setCategoryFilterQuery,
    // Category creating and editing
    pointingCategoryId,
    setPointingCategoryId,
    quitFromCreatingNewItem,
    updateSubmittedCategory,
    isCategoryEditOpen,
    setIsCategoryEditOpen,
    editingCategory,
    openCategoryCreating,
    openCategoryUpdating,
    clearCategoryEditing,
    // Item creating and updating
    isItemEditOpen,
    setIsItemEditOpen,
    creatingItemCoordinates,
    editingItem,
    openItemCreating,
    openItemUpdating,
    updateSubmittedItem,
    clearItemEditing,
    // Updating item coordinates
    relocateItem,
    relocatingItem,
    updateItemCoordinates,
    // Updating item collection
    updateItemCollection,
    itemCollectionUpdating,
  };
};

export default usePlayProvider;
