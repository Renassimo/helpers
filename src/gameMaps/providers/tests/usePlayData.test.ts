import { act, renderHook, cleanup } from '@testing-library/react';

import useAlerts from '@/common/hooks/alerts';

import { getAttributeObjectFromArray } from '@/common/utils/data';
import getCategoriesStateWithCountedItems from '@/gameMaps/utils/getCategoriesStateWithCountedItems';

import { PlayContextData, PlayPageData } from '@/gameMaps/types';

import {
  mockedCategories,
  mockedGame,
  mockedItems,
  mockedPlay,
  mockedPlay2,
} from '@/gameMaps/types/mocks';

import usePlayData from '../hooks/usePlayData';

const mockedPush = jest.fn();

jest.mock('@/common/hooks/alerts');
jest.mock('@/common/utils/data');
jest.mock('@/gameMaps/utils/getCategoriesStateWithCountedItems');
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: mockedPush,
  })),
}));

describe('usePlayData', () => {
  const mockedCreateSuccessAlert = jest.fn();
  const mockedClearAll = jest.fn();
  const mockedUseAlerts = jest.fn(() => ({
    createSuccessAlert: mockedCreateSuccessAlert,
    clearAll: mockedClearAll,
  }));
  const mockedObject = {
    id: 'id0',
    attributes: { attr1: 'attr1-0', attr2: 'attr2-0' },
  };
  const mockedAttributeObjectFromArray = {
    [mockedObject.id]: mockedObject,
  };
  const mockedGetAttributeObjectFromArray = jest.fn(
    () => mockedAttributeObjectFromArray
  );
  const mockedObject1 = {
    id: 'id1',
    attributes: { attr1: 'attr1-1', attr2: 'attr2-1', chosen: true },
  };
  const mockedObject2 = {
    id: 'id2',
    attributes: { attr1: 'attr1-2', attr2: 'attr2-2', chosen: true },
  };
  const mockedCategoriesStateWithCountedItem = {
    [mockedObject1.id]: mockedObject1,
    [mockedObject2.id]: mockedObject2,
  };
  const mockedGetCategoriesStateWithCountedItems = jest.fn(
    () => mockedCategoriesStateWithCountedItem
  );

  const mockedData: PlayPageData = {
    gameData: mockedGame,
    playData: mockedPlay,
    categoriesData: mockedCategories,
    itemsData: mockedItems,
  };

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
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

  const expecteDefaultState = {
    game: mockedGame,
    play: mockedPlay,
    updateSubmittedPlay: expect.any(Function),
    isPlayEditOpen: false,
    setIsPlayEditOpen: expect.any(Function),
    categories: mockedCategoriesStateWithCountedItem,
    items: [mockedObject],
    categoriesList: [mockedObject1, mockedObject2],
    isEveryCategoryChosen: true,
    isNoCategoriesChosen: false,
    visibleItems: [],
    choseAllCategories: expect.any(Function),
    clearAllChosenCategories: expect.any(Function),
    changeCategoryChoose: expect.any(Function),
    pointingCategoryId: null,
    setPointingCategoryId: expect.any(Function),
    quitFromCreatingNewItem: expect.any(Function),
  } as unknown as PlayContextData;

  test('returns state', () => {
    // Arange
    const expectedState = expecteDefaultState;
    // Act
    const { result } = renderHook(() => usePlayData(mockedData));
    // Assert
    expect(result.current).toEqual(expectedState);
    expect(mockedUseAlerts).toHaveBeenCalledWith();
    expect(mockedGetAttributeObjectFromArray).toHaveBeenCalledTimes(2);
  });

  describe('when updates submitted play', () => {
    test('creates success alert and updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        play: mockedPlay2,
      };
      const { result } = renderHook(() => usePlayData(mockedData));
      // Act
      await act(async () => {
        await result.current.updateSubmittedPlay(mockedPlay2);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
      expect(mockedPush).not.toHaveBeenCalled();
      expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
        `"${mockedPlay2.attributes.title}" play was updated!`
      );
    });

    describe('when play is data', () => {
      test('creates success alert and updates state', async () => {
        // Arange
        const expectedState = {
          ...expecteDefaultState,
          play: null,
        };
        const { result } = renderHook(() => usePlayData(mockedData));
        // Act
        await act(async () => {
          await result.current.updateSubmittedPlay(null);
        });
        // Assert
        expect(result.current).toEqual(expectedState);
        expect(mockedPush).toHaveBeenCalledWith(
          `/gameMaps/games/${mockedGame?.id}`
        );
        expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
          `Play was deleted!`
        );
      });
    });
  });

  describe('when calls setIsPlayEditOpen', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        isPlayEditOpen: true,
      };
      const { result } = renderHook(() => usePlayData(mockedData));
      // Act
      await act(async () => {
        await result.current.setIsPlayEditOpen(true);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
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
        } as unknown as PlayContextData;
        const { result } = renderHook(() => usePlayData(mockedData));
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
        } as unknown as PlayContextData;
        const { result } = renderHook(() => usePlayData(mockedData));
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
        const { result } = renderHook(() => usePlayData(mockedData));
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

  describe('when updates poinitngCategoryId', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        pointingCategoryId: mockedObject2.id,
      } as unknown as PlayContextData;
      const { result } = renderHook(() => usePlayData(mockedData));
      // Act
      await act(async () => {
        await result.current.setPointingCategoryId(mockedObject2.id);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when quits from creating new item', () => {
    test('updates state', async () => {
      // Arange
      const { result } = renderHook(() => usePlayData(mockedData));
      await act(async () => {
        await result.current.setPointingCategoryId(mockedObject2.id);
      });
      expect(result.current.pointingCategoryId).toEqual(mockedObject2.id);
      // Act
      await act(async () => {
        await result.current.quitFromCreatingNewItem();
      });
      // Assert
      expect(result.current).toEqual(expecteDefaultState);
      expect(mockedClearAll).toHaveBeenCalledWith();
    });
  });
});
