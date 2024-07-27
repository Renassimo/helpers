import { ItemData } from '../itemTypes';

export const mockedItem1: ItemData = {
  id: 'it1',
  attributes: {
    categoryId: 'cat1',
    collected: true,
    coordinates: [0.5, 10.5],
    description: 'Item 1 description',
    imageUrl: 'https://',
    playId: 'pl1',
  },
};

export const mockedItem2: ItemData = {
  id: 'it2',
  attributes: {
    categoryId: 'cat1',
    collected: true,
    coordinates: [0.6, 10.6],
    description: 'Item 2 description',
    imageUrl: 'https://',
    playId: 'pl2',
  },
};

export const mockedItem = mockedItem1;

export const mockedItems: ItemData[] = [mockedItem1, mockedItem2];
