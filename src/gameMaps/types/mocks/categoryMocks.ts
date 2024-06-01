import { CategoryData } from '../categoryTypes';

export const mockedCategory1: CategoryData = {
  id: 'cat1',
  attributes: {
    color: '#fff',
    description: 'Category 1 description',
    title: 'Category 1',
    itemsAmount: 50,
    gameId: 'gm1',
  },
};

export const mockedCategory2: CategoryData = {
  id: 'cat2',
  attributes: {
    color: '#888',
    description: 'Category 2 description',
    title: 'Category 2',
    itemsAmount: 35,
    gameId: 'gm2',
  },
};

export const mockedCategory = mockedCategory1;

export const mockedCategories: CategoryData[] = [
  mockedCategory1,
  mockedCategory2,
];
