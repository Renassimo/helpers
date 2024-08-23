import { renderHook, cleanup, act } from '@testing-library/react';

import useFilter from '../useFilter';

describe('useFilter', () => {
  const mockedItem1 = {
    id: '1',
    attributes: { attr1: 'attr1-1', attr2: 'attr2-1', attr3: null },
  };
  const mockedItem2 = {
    id: '2',
    attributes: { attr1: 'attr1-2', attr2: null, attr3: 'attr3-2' },
  };
  const mockedItems = [mockedItem1, mockedItem2];

  afterEach(() => {
    cleanup();
  });

  test('returns default filter state', () => {
    // Arange
    // Act
    const { result } = renderHook(() =>
      useFilter(mockedItems, ['attr1', 'attr3'])
    );
    // Assert
    expect(result.current).toEqual({
      filterQuery: '',
      setFilterQuery: expect.any(Function),
      visibleItems: mockedItems,
    });
  });

  describe('when changes filter query', () => {
    test('returns updated filter state', async () => {
      // Arange
      const { result } = renderHook(() =>
        useFilter(mockedItems, ['attr1', 'attr3'])
      );
      // Act
      await act(async () => {
        await result.current.setFilterQuery('3-2');
      });
      // Assert
      expect(result.current).toEqual({
        filterQuery: '3-2',
        setFilterQuery: expect.any(Function),
        visibleItems: [mockedItem2],
      });
    });

    describe('when does not find coincidences in passed keys', () => {
      test('returns updated filter state with empty items', async () => {
        // Arange
        const { result } = renderHook(() =>
          useFilter(mockedItems, ['attr1', 'attr3'])
        );
        // Act
        await act(async () => {
          await result.current.setFilterQuery('2-1');
        });
        // Assert
        expect(result.current).toEqual({
          filterQuery: '2-1',
          setFilterQuery: expect.any(Function),
          visibleItems: [],
        });
      });
    });
  });
});
