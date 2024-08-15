import { renderHook, cleanup } from '@testing-library/react';

import { PlayContextData, PlayPageData } from '@/gameMaps/types';

import {
  mockedCategories as mockedCategoriesData,
  mockedGame as mockedGameData,
  mockedItems as mockedItemsData,
  mockedPlay as mockedPlayData,
} from '@/gameMaps/types/mocks';

import usePlayData from '../hooks/subhooks/usePlayData';
import useItemsData from '../hooks/subhooks/useItemsData';
import useCategoriesData from '../hooks/subhooks/useCategoriesData';
import useCreateUpdateCategory from '../hooks/subhooks/useCreateUpdateCategory';
import useCreateUpdateItem from '../hooks/subhooks/useCreateUpdateItem';
import useUpdateItemCoordinates from '../hooks/subhooks/useUpdateItemCoordinates';
import useUpdateItemCollection from '../hooks/subhooks/useUpdateItemCollection';

import usePlayProvider from '../hooks/usePlayProvider';

jest.mock('../hooks/subhooks/usePlayData');
jest.mock('../hooks/subhooks/useItemsData');
jest.mock('../hooks/subhooks/useCategoriesData');
jest.mock('../hooks/subhooks/useCreateUpdateCategory');
jest.mock('../hooks/subhooks/useCreateUpdateItem');
jest.mock('../hooks/subhooks/useUpdateItemCoordinates');
jest.mock('../hooks/subhooks/useUpdateItemCollection');

describe('usePlayProvider', () => {
  const mockedData: PlayPageData = {
    gameData: mockedGameData,
    playData: mockedPlayData,
    categoriesData: mockedCategoriesData,
    itemsData: mockedItemsData,
  };

  const mockedPlay = 'mockedPlay';
  const mockedUpdateSubmittedPlay = 'mockedUpdateSubmittedPlay';
  const mockedIsPlayEditOpen = 'mockedIsPlayEditOpen';
  const mockedSetIsPlayEditOpen = 'mockedSetIsPlayEditOpen';
  const mockedUsePlayData = jest.fn(() => ({
    play: mockedPlay,
    updateSubmittedPlay: mockedUpdateSubmittedPlay,
    isPlayEditOpen: mockedIsPlayEditOpen,
    setIsPlayEditOpen: mockedSetIsPlayEditOpen,
  }));

  const mockedItems = 'mockedItems';
  const mockedItemsList = 'mockedItemsList';
  const mockedUpdateItem = 'mockedUpdateItem';
  const mockedUseItemsData = jest.fn(() => ({
    items: mockedItems,
    itemsList: mockedItemsList,
    updateItem: mockedUpdateItem,
  }));

  const mockedCategories = 'mockedCategories';
  const mockedUpdateCategory = 'mockedUpdateCategory';
  const mockedRecountCategories = 'mockedRecountCategories';
  const mockedCategoriesList = 'mockedCategoriesList';
  const mockedVisibleItems = 'mockedVisibleItems';
  const mockedChoseAllCategories = 'mockedChoseAllCategories';
  const mockedClearAllChosenCategories = 'mockedClearAllChosenCategories';
  const mockedChangeCategoryChoose = 'mockedChangeCategoryChoose';
  const mockedIsEveryCategoryChosen = 'mockedIsEveryCategoryChosen';
  const mockedIsNoCategoriesChosen = 'mockedIsNoCategoriesChosen';
  const mockedUseCategoriesData = jest.fn(() => ({
    categories: mockedCategories,
    updateCategory: mockedUpdateCategory,
    recountCategories: mockedRecountCategories,
    categoriesList: mockedCategoriesList,
    visibleItems: mockedVisibleItems,
    choseAllCategories: mockedChoseAllCategories,
    clearAllChosenCategories: mockedClearAllChosenCategories,
    changeCategoryChoose: mockedChangeCategoryChoose,
    isEveryCategoryChosen: mockedIsEveryCategoryChosen,
    isNoCategoriesChosen: mockedIsNoCategoriesChosen,
  }));

  const mockedIsCategoryEditOpen = 'mockedIsCategoryEditOpen';
  const mockedSetIsCategoryEditOpen = 'mockedSetIsCategoryEditOpen';
  const mockedEditingCategory = 'mockedEditingCategory';
  const mockedOpenCategoryCreating = 'mockedOpenCategoryCreating';
  const mockedOpenCategoryUpdating = 'mockedOpenCategoryUpdating';
  const mockedUpdateSubmittedCategory = 'mockedUpdateSubmittedCategory';
  const mockedUseCreateUpdateCategory = jest.fn(() => ({
    isCategoryEditOpen: mockedIsCategoryEditOpen,
    setIsCategoryEditOpen: mockedSetIsCategoryEditOpen,
    editingCategory: mockedEditingCategory,
    openCategoryCreating: mockedOpenCategoryCreating,
    openCategoryUpdating: mockedOpenCategoryUpdating,
    updateSubmittedCategory: mockedUpdateSubmittedCategory,
  }));

  const mockedIsItemEditOpen = 'mockedIsItemEditOpen';
  const mockedCreatingItemCoordinates = 'mockedCreatingItemCoordinates';
  const mockedPointingCategoryId = 'mockedPointingCategoryId';
  const mockedEditingItem = 'mockedEditingItem';
  const mockedSetPointingCategoryId = 'mockedSetPointingCategoryId';
  const mockedSetIsItemEditOpen = 'mockedSetIsItemEditOpen';
  const mockedOpenItemCreating = 'mockedOpenItemCreating';
  const mockedOpenItemUpdating = 'mockedOpenItemUpdating';
  const mockedUpdateSubmittedItem = 'mockedUpdateSubmittedItem';
  const mockedQuitFromCreatingNewItem = 'mockedQuitFromCreatingNewItem';
  const mockedUseCreateUpdateItem = jest.fn(() => ({
    isItemEditOpen: mockedIsItemEditOpen,
    creatingItemCoordinates: mockedCreatingItemCoordinates,
    pointingCategoryId: mockedPointingCategoryId,
    editingItem: mockedEditingItem,
    setPointingCategoryId: mockedSetPointingCategoryId,
    setIsItemEditOpen: mockedSetIsItemEditOpen,
    openItemCreating: mockedOpenItemCreating,
    openItemUpdating: mockedOpenItemUpdating,
    updateSubmittedItem: mockedUpdateSubmittedItem,
    quitFromCreatingNewItem: mockedQuitFromCreatingNewItem,
  }));

  const mockedRelocateItem = 'mockedRelocateItem';
  const mockedRelocatingItem = 'mockedRelocatingItem';
  const mockedUpdateItemCoordinates = 'mockedUpdateItemCoordinates';
  const mockedUseUpdateItemCoordinates = jest.fn(() => ({
    relocateItem: mockedRelocateItem,
    relocatingItem: mockedRelocatingItem,
    updateItemCoordinates: mockedUpdateItemCoordinates,
  }));

  const mockedUpdateItemCollection = 'mockedUpdateItemCollection';
  const mockedItemCollectionUpdating = 'mockedItemCollectionUpdating';
  const mockedUseUpdateItemCollection = jest.fn(() => ({
    updateItemCollection: mockedUpdateItemCollection,
    loading: mockedItemCollectionUpdating,
  }));

  beforeEach(() => {
    (usePlayData as unknown as jest.Mock).mockImplementation(mockedUsePlayData);
    (useItemsData as unknown as jest.Mock).mockImplementation(
      mockedUseItemsData
    );
    (useCategoriesData as unknown as jest.Mock).mockImplementation(
      mockedUseCategoriesData
    );
    (useCreateUpdateCategory as unknown as jest.Mock).mockImplementation(
      mockedUseCreateUpdateCategory
    );
    (useCreateUpdateItem as unknown as jest.Mock).mockImplementation(
      mockedUseCreateUpdateItem
    );
    (useUpdateItemCoordinates as unknown as jest.Mock).mockImplementation(
      mockedUseUpdateItemCoordinates
    );
    (useUpdateItemCollection as unknown as jest.Mock).mockImplementation(
      mockedUseUpdateItemCollection
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const expecteDefaultState = {
    game: mockedGameData,
    // Play data
    play: mockedPlay,
    updateSubmittedPlay: mockedUpdateSubmittedPlay,
    isPlayEditOpen: mockedIsPlayEditOpen,
    setIsPlayEditOpen: mockedSetIsPlayEditOpen,
    // Items data
    items: mockedItems,
    itemsList: mockedItemsList,
    // Categories data
    categories: mockedCategories,
    categoriesList: mockedCategoriesList,
    visibleItems: mockedVisibleItems,
    choseAllCategories: mockedChoseAllCategories,
    clearAllChosenCategories: mockedClearAllChosenCategories,
    changeCategoryChoose: mockedChangeCategoryChoose,
    isEveryCategoryChosen: mockedIsEveryCategoryChosen,
    isNoCategoriesChosen: mockedIsNoCategoriesChosen,
    // Category creating and editing
    isCategoryEditOpen: mockedIsCategoryEditOpen,
    setIsCategoryEditOpen: mockedSetIsCategoryEditOpen,
    editingCategory: mockedEditingCategory,
    openCategoryCreating: mockedOpenCategoryCreating,
    openCategoryUpdating: mockedOpenCategoryUpdating,
    updateSubmittedCategory: mockedUpdateSubmittedCategory,
    // Item creating and updating
    isItemEditOpen: mockedIsItemEditOpen,
    creatingItemCoordinates: mockedCreatingItemCoordinates,
    pointingCategoryId: mockedPointingCategoryId,
    editingItem: mockedEditingItem,
    setPointingCategoryId: mockedSetPointingCategoryId,
    setIsItemEditOpen: mockedSetIsItemEditOpen,
    openItemCreating: mockedOpenItemCreating,
    openItemUpdating: mockedOpenItemUpdating,
    updateSubmittedItem: mockedUpdateSubmittedItem,
    quitFromCreatingNewItem: mockedQuitFromCreatingNewItem,
    // Updating item coordinates
    relocateItem: mockedRelocateItem,
    relocatingItem: mockedRelocatingItem,
    updateItemCoordinates: mockedUpdateItemCoordinates,
    // Updating item collection
    updateItemCollection: mockedUpdateItemCollection,
    itemCollectionUpdating: mockedItemCollectionUpdating,
  } as unknown as PlayContextData;

  //
  test('returns state and calls hooks correctly', () => {
    // Arange
    const expectedState = expecteDefaultState;
    // Act
    const { result } = renderHook(() => usePlayProvider(mockedData));
    // Assert
    expect(result.current).toEqual(expectedState);
    expect(mockedUsePlayData).toHaveBeenCalledWith(
      mockedGameData,
      mockedPlayData
    );
    expect(mockedUseItemsData).toHaveBeenCalledWith(mockedItemsData);
    expect(mockedUseCategoriesData).toHaveBeenCalledWith(
      mockedCategoriesData,
      mockedItemsList
    );
    expect(mockedUseCreateUpdateCategory).toHaveBeenCalledWith(
      mockedCategories,
      mockedUpdateCategory
    );
    expect(mockedUseCreateUpdateItem).toHaveBeenCalledWith(
      mockedItems,
      mockedUpdateItem,
      mockedRecountCategories
    );
    expect(mockedUseUpdateItemCoordinates).toHaveBeenCalledWith(
      mockedGameData,
      mockedPlay,
      mockedItems,
      mockedSetPointingCategoryId,
      mockedUpdateSubmittedItem
    );
    expect(mockedUseUpdateItemCollection).toHaveBeenCalledWith(
      mockedGameData,
      mockedPlay,
      mockedUpdateSubmittedItem
    );
  });
});
