import { act, renderHook, cleanup } from '@testing-library/react';

import { getAttributeObjectFromArray } from '@/common/utils/data';
import getCategoriesStateWithCountedItems from '@/gameMaps/utils/getCategoriesStateWithCountedItems';

import {
  mockedCategories,
  mockedCategory1,
  mockedCategory2,
  mockedItem1,
  mockedItem2,
} from '@/gameMaps/types/mocks';

import useCategoriesData from '../hooks/subhooks/useCategoriesData';

jest.mock('@/common/utils/data');
jest.mock('@/gameMaps/utils/getCategoriesStateWithCountedItems');

describe('useCategoriesData', () => {
  const mockedAttributeObjectFromArray = {
    [mockedCategory1.id]: {
      ...mockedCategory1,
      attributes: {
        ...mockedCategory1.attributes,
        chosen: true,
      },
    },
    [mockedCategory2.id]: {
      ...mockedCategory2,
      attributes: {
        ...mockedCategory2.attributes,
        chosen: true,
      },
    },
  };
  const mockedGetAttributeObjectFromArray = jest.fn(
    () => mockedAttributeObjectFromArray
  );
  const mockedObject1 = {
    ...mockedCategory1,
    attributes: {
      ...mockedCategory1.attributes,
      chosen: true,
      foundItemsAmount: 2,
      collectedItemsAmount: 2,
    },
  };
  const mockedObject2 = {
    ...mockedCategory2,
    attributes: {
      ...mockedCategory2.attributes,
      chosen: true,
      foundItemsAmount: 0,
      collectedItemsAmount: 0,
    },
  };
  const mockedCategoriesStateWithCountedItem = {
    [mockedObject1.id]: mockedObject1,
    [mockedObject2.id]: mockedObject2,
  };
  const mockedGetCategoriesStateWithCountedItems = jest.fn(
    () => mockedCategoriesStateWithCountedItem
  );
  const mockedCategoriesList = [mockedObject1, mockedObject2];

  const expectedVisibleItems = [mockedItem1, mockedItem2];

  beforeEach(() => {
    (getAttributeObjectFromArray as unknown as jest.Mock).mockImplementation(
      mockedGetAttributeObjectFromArray
    );
    (
      getCategoriesStateWithCountedItems as unknown as jest.Mock
    ).mockImplementation(mockedGetCategoriesStateWithCountedItems);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const mockedItemsList = [mockedItem1, mockedItem2];

  const expecteDefaultState = {
    categories: mockedCategoriesStateWithCountedItem,
    updateCategory: expect.any(Function),
    recountCategories: expect.any(Function),
    categoriesList: mockedCategoriesList,
    visibleItems: expectedVisibleItems,
    choseAllCategories: expect.any(Function),
    clearAllChosenCategories: expect.any(Function),
    changeCategoryChoose: expect.any(Function),
    isEveryCategoryChosen: true,
    isNoCategoriesChosen: false,
  };

  test('returns state', () => {
    // Arange
    // Act
    const { result } = renderHook(() =>
      useCategoriesData(mockedCategories, mockedItemsList)
    );
    // Assert
    expect(result.current).toEqual(expecteDefaultState);
    expect(mockedGetAttributeObjectFromArray).toHaveBeenCalledWith(
      mockedCategories,
      { chosen: true }
    );
    expect(mockedGetCategoriesStateWithCountedItems).toHaveBeenCalledWith(
      mockedAttributeObjectFromArray,
      mockedItemsList
    );
  });

  describe('when updates category', () => {
    test('updates state', async () => {
      // Arange
      const mockedUpdatedCategory = {
        ...mockedCategory2,
        attributes: {
          ...mockedCategory2.attributes,
          title: 'Updated title',
          chosen: true,
        },
      };
      const { result } = renderHook(() =>
        useCategoriesData(mockedCategories, mockedItemsList)
      );
      // Act
      await act(async () => {
        await result.current.updateCategory(mockedUpdatedCategory);
      });
      // Assert
      expect(result.current).toEqual(expecteDefaultState);
      expect(mockedGetCategoriesStateWithCountedItems).toHaveBeenCalledWith(
        { [mockedUpdatedCategory.id]: mockedUpdatedCategory },
        mockedItemsList
      );
    });

    describe('when deletes category', () => {
      test('updates state', async () => {
        // Arange
        const expectedState = {
          ...expecteDefaultState,
          categories: {
            [mockedObject1.id]: mockedObject1,
          },
          categoriesList: [mockedObject1],
        };
        const { result } = renderHook(() =>
          useCategoriesData(mockedCategories, mockedItemsList)
        );
        // Act
        await act(async () => {
          await result.current.updateCategory(null, mockedCategory2.id);
        });
        // Assert
        expect(result.current).toEqual(expectedState);
      });
    });
  });

  describe('when recounts categories', () => {
    test('updates state', async () => {
      // Arange
      const { result } = renderHook(() =>
        useCategoriesData(mockedCategories, mockedItemsList)
      );
      // Act
      await act(async () => {
        await result.current.recountCategories([mockedItem1]);
      });
      // Assert
      expect(result.current).toEqual(expecteDefaultState);
      expect(mockedGetCategoriesStateWithCountedItems).toHaveBeenCalledWith(
        expecteDefaultState.categories,
        [mockedItem1]
      );
    });
  });

  describe('when category is chosing', () => {
    describe('when all categories cleared', () => {
      test('updates state', async () => {
        // Arange
        const expectedObject1 = {
          ...mockedObject1,
          attributes: { ...mockedObject1.attributes, chosen: false },
        };
        const expectdeObject2 = {
          ...mockedObject2,
          attributes: { ...mockedObject2.attributes, chosen: false },
        };
        const expectedState = {
          ...expecteDefaultState,
          categories: {
            [mockedObject1.id]: expectedObject1,
            [mockedObject2.id]: expectdeObject2,
          },
          categoriesList: [expectedObject1, expectdeObject2],
          isEveryCategoryChosen: false,
          isNoCategoriesChosen: true,
          visibleItems: [],
        };
        const { result } = renderHook(() =>
          useCategoriesData(mockedCategories, mockedItemsList)
        );
        // Act
        await act(async () => {
          await result.current.clearAllChosenCategories();
        });
        // Assert
        expect(result.current).toEqual(expectedState);
      });
    });

    describe('when one category was chosen', () => {
      test('updates state', async () => {
        // Arange
        const expectedObject1 = {
          ...mockedObject1,
          attributes: { ...mockedObject1.attributes, chosen: false },
        };
        const expectedState = {
          ...expecteDefaultState,
          categories: {
            ...expecteDefaultState.categories,
            [mockedObject1.id]: expectedObject1,
          },
          categoriesList: [expectedObject1, mockedObject2],
          isEveryCategoryChosen: false,
          isNoCategoriesChosen: false,
          visibleItems: [],
        };
        const { result } = renderHook(() =>
          useCategoriesData(mockedCategories, mockedItemsList)
        );
        // Act
        await act(async () => {
          await result.current.changeCategoryChoose(mockedObject1.id, false);
        });
        // Assert
        expect(result.current).toEqual(expectedState);
      });
    });

    describe('when all categories was chosen', () => {
      test('updates state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useCategoriesData(mockedCategories, mockedItemsList)
        );
        await act(async () => {
          await result.current.changeCategoryChoose(mockedObject1.id, false);
        });
        expect(result.current.isEveryCategoryChosen).toBeFalsy();
        expect(result.current.isNoCategoriesChosen).toBeFalsy();
        // Act
        await act(async () => {
          await result.current.choseAllCategories();
        });
        // Assert
        expect(result.current).toEqual(expecteDefaultState);
      });
    });
  });
});
