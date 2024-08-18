import { CategoryData } from '../categoryTypes';

export const mockedCategory1: CategoryData = {
  id: 'cat1',
  attributes: {
    color: '#fff',
    description: 'Category 1 description',
    title: 'Category 1',
    itemsAmount: 50,
  },
};

export const mockedCategory2: CategoryData = {
  id: 'cat2',
  attributes: {
    color: '#888',
    description: 'Category 2 description',
    title: 'Category 2',
    itemsAmount: 35,
  },
};

export const mockedCategory3: CategoryData = {
  id: 'cat3',
  attributes: {
    color: '#888',
    description: 'Category 3 description',
    title: 'Category 3',
    itemsAmount: 1,
  },
};

export const mockedCategory = mockedCategory1;

export const mockedCategories: CategoryData[] = [
  mockedCategory1,
  mockedCategory2,
];
