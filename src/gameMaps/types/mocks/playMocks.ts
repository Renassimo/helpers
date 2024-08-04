import { PlayData } from '../playTypes';

export const mockedPlay1: PlayData = {
  id: 'pl1',
  attributes: {
    title: 'Play 1',
    description: 'Play 1 description',
    createdAt: '10-10',
    updatedAt: '11-11',
  },
};

export const mockedPlay2: PlayData = {
  id: 'pl2',
  attributes: {
    title: 'Play 2',
    description: 'Play 2 description',
    createdAt: '20-20',
    updatedAt: '22-22',
  },
};

export const mockedPlay = mockedPlay1;

export const mockedPlays: PlayData[] = [mockedPlay1, mockedPlay2];
