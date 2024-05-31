import { PlayData } from '../playTypes';

export const mockedPlay1: PlayData = {
  id: '1',
  attributes: {
    title: 'Play 1',
    description: 'Play 1 description',
    gameId: 'Game 1 id',
    lastUpdateDate: '11-11',
    startDate: '10-10',
  },
};

export const mockedPlay2: PlayData = {
  id: '2',
  attributes: {
    title: 'Play 2',
    description: 'Play 2 description',
    gameId: 'Game 2 id',
    lastUpdateDate: '22-22',
    startDate: '20-20',
  },
};

export const mockedPlay = mockedPlay1;

export const mockedPlays: PlayData[] = [mockedPlay1, mockedPlay2];
