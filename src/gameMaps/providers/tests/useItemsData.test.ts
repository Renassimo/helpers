import { act, renderHook, cleanup } from '@testing-library/react';

import { getAttributeObjectFromArray } from '@/common/utils/data';
import useItemsData from '../hooks/subhooks/useItemsData';
import { mockedItem1, mockedItem2, mockedItems } from '@/gameMaps/types/mocks';

jest.mock('@/common/utils/data');

describe('useItemsData', () => {
  const mockedItemsState = {
    [mockedItem1.id]: mockedItem1,
    [mockedItem2.id]: mockedItem2,
  };
  const mockedGetAttributeObjectFromArray = jest.fn(() => mockedItemsState);

  const expectedDefaultState = {
    items: mockedItemsState,
    updateItem: expect.any(Function),
    itemsList: mockedItems,
  };
  const mockedRecountCategories = jest.fn();

  beforeEach(() => {
    (getAttributeObjectFromArray as unknown as jest.Mock).mockImplementation(
      mockedGetAttributeObjectFromArray
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('returns state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useItemsData(mockedItems));
    // Assert
    expect(result.current).toEqual(expectedDefaultState);
    expect(mockedGetAttributeObjectFromArray).toHaveBeenCalledWith(mockedItems);
  });

  describe('when update item', () => {
    test('returns updated state', async () => {
      // Arange
      const mockedUpdatedItem = {
        ...mockedItem2,
        attributes: {
          ...mockedItem2.attributes,
          description: 'updated description',
        },
      };
      const expectedState = {
        ...expectedDefaultState,
        items: {
          ...expectedDefaultState.items,
          [mockedUpdatedItem.id]: mockedUpdatedItem,
        },
        itemsList: [mockedItem1, mockedUpdatedItem],
      };
      const { result } = renderHook(() => useItemsData(mockedItems));
      // Act
      await act(async () => {
        await result.current.updateItem(
          mockedUpdatedItem,
          mockedRecountCategories
        );
      });
      // Assert
      expect(result.current).toEqual(expectedState);
      expect(mockedRecountCategories).toHaveBeenCalledWith([
        mockedItem1,
        mockedUpdatedItem,
      ]);
    });

    describe('when item is null', () => {
      test('returns updated state', async () => {
        // Arange
        const expectedState = {
          ...expectedDefaultState,
          items: {
            [mockedItem1.id]: mockedItem1,
          },
          itemsList: [mockedItem1],
        };
        const { result } = renderHook(() => useItemsData(mockedItems));
        // Act
        await act(async () => {
          await result.current.updateItem(
            null,
            mockedRecountCategories,
            mockedItem2.id
          );
        });
        // Assert
        expect(result.current).toEqual(expectedState);
        expect(mockedRecountCategories).toHaveBeenCalledWith([mockedItem1]);
      });
    });
  });
});
