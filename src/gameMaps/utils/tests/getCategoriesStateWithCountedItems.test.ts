import { CategoriesState, ItemData } from '@/gameMaps/types';
import {
  mockedCategory1,
  mockedCategory2,
  mockedItem1,
  mockedItem2,
} from '@/gameMaps/types/mocks';
import getCategoriesStateWithCountedItems from '../getCategoriesStateWithCountedItems';

describe('getCategoriesStateWithCountedItems', () => {
  test('returns updatedState', () => {
    // Arange
    const categories: CategoriesState = {
      [mockedCategory1.id]: mockedCategory1,
      [mockedCategory2.id]: mockedCategory2,
    };
    const items: ItemData[] = [
      mockedItem1,
      mockedItem2,
      mockedItem1,
      mockedItem2,
      {
        ...mockedItem1,
        attributes: { ...mockedItem1.attributes, collected: false },
      },
      {
        ...mockedItem2,
        attributes: { ...mockedItem2.attributes, collected: false },
      },
    ];

    const expectedResult = {
      [mockedCategory1.id]: {
        ...mockedCategory1,
        attributes: {
          ...mockedCategory1.attributes,
          foundItemsAmount: 6,
          collectedItemsAmount: 4,
        },
      },
      [mockedCategory2.id]: mockedCategory2,
    };
    // Act
    const result = getCategoriesStateWithCountedItems(categories, items);
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
