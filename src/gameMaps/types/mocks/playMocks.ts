import { PlayData } from '../playTypes';

export const mockedPlay1: PlayData = {
  id: 'pl1',
  attributes: {
    title: 'Play 1',
    description: 'Play 1 description',
    lastUpdateDate: '11-11',
    startDate: '10-10',
  },
};

export const mockedPlay2: PlayData = {
  id: 'pl2',
  attributes: {
    title: 'Play 2',
    description: 'Play 2 description',
    lastUpdateDate: '22-22',
    startDate: '20-20',
  },
};

export const mockedPlay = mockedPlay1;

export const mockedPlays: PlayData[] = [mockedPlay1, mockedPlay2];
