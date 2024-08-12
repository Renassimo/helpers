import { act, renderHook, cleanup } from '@testing-library/react';

import useAlerts from '@/common/hooks/alerts';

import { PlayContextData } from '@/gameMaps/types';

import { mockedCategory1, mockedCategory2 } from '@/gameMaps/types/mocks';

import useCreateUpdateCategory from '../hooks/subhooks/useCreateUpdateCategory';

jest.mock('@/common/hooks/alerts');

describe('useCreateUpdateCategory', () => {
  const mockedCreateSuccessAlert = jest.fn();
  const mockedUseAlerts = jest.fn(() => ({
    createSuccessAlert: mockedCreateSuccessAlert,
  }));
  const mockedObject1 = {
    ...mockedCategory1,
    attributes: { ...mockedCategory1.attributes, chosen: true },
  };

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const expecteDefaultState = {
    isCategoryEditOpen: false,
    setIsCategoryEditOpen: expect.any(Function),
    editingCategory: null,
    openCategoryCreating: expect.any(Function),
    openCategoryUpdating: expect.any(Function),
    updateSubmittedCategory: expect.any(Function),
  } as unknown as PlayContextData;

  const mockedUpdateCategory = jest.fn();
  const mockedCategoriesState = {
    [mockedCategory1.id]: {
      ...mockedCategory1,
      attributes: { ...mockedCategory1.attributes, chosen: true },
    },
    [mockedCategory2.id]: {
      ...mockedCategory2,
      attributes: { ...mockedCategory2.attributes, chosen: true },
    },
  };

  test('returns state', () => {
    // Arange
    // Act
    const { result } = renderHook(() =>
      useCreateUpdateCategory(mockedCategoriesState, mockedUpdateCategory)
    );
    // Assert
    expect(result.current).toEqual(expecteDefaultState);
  });

  describe('when updates submitted category', () => {
    test('creates success alert and updates state', async () => {
      // Arange
      const { result } = renderHook(() =>
        useCreateUpdateCategory(mockedCategoriesState, mockedUpdateCategory)
      );
      // Act
      await act(async () => {
        await result.current.updateSubmittedCategory(mockedCategory2);
      });
      // Assert
      expect(mockedUpdateCategory).toHaveBeenCalledWith({
        ...mockedCategory2,
        attributes: { ...mockedCategory2.attributes, chosen: true },
      });
      expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
        `Categories were updated!`
      );
    });

    describe('when category is null', () => {
      test('creates success alert and updates state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useCreateUpdateCategory(mockedCategoriesState, mockedUpdateCategory)
        );
        // Act
        await act(async () => {
          await result.current.updateSubmittedCategory(null, mockedObject1.id);
        });
        // Assert
        expect(mockedUpdateCategory).toHaveBeenCalledWith(
          null,
          mockedObject1.id
        );
        expect(mockedCreateSuccessAlert).toHaveBeenCalledWith(
          `Category was deleted!`
        );
      });
    });
  });

  describe('when calls setIsCategoryEditOpen', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        isCategoryEditOpen: true,
      };
      const { result } = renderHook(() =>
        useCreateUpdateCategory(mockedCategoriesState, mockedUpdateCategory)
      );
      // Act
      await act(async () => {
        await result.current.setIsCategoryEditOpen(true);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when calls openCategoryCreating', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        isCategoryEditOpen: true,
      };
      const { result } = renderHook(() =>
        useCreateUpdateCategory(mockedCategoriesState, mockedUpdateCategory)
      );
      // Act
      await act(async () => {
        await result.current.openCategoryCreating();
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });

  describe('when calls openCategoryUpdating', () => {
    test('updates state', async () => {
      // Arange
      const expectedState = {
        ...expecteDefaultState,
        isCategoryEditOpen: true,
        editingCategory: mockedObject1,
      };
      const { result } = renderHook(() =>
        useCreateUpdateCategory(mockedCategoriesState, mockedUpdateCategory)
      );
      // Act
      await act(async () => {
        await result.current.openCategoryUpdating(mockedObject1.id);
      });
      // Assert
      expect(result.current).toEqual(expectedState);
    });
  });
});
