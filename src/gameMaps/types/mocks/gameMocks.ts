import { GameData } from '../gameTypes';

export const mockedGame1: GameData = {
  id: '1',
  attributes: {
    title: 'Game 1',
    backgroundColor: '#fff',
    description: 'Game 1 description',
    mapImageUrl: '/',
  },
};

export const mockedGame2: GameData = {
  id: '2',
  attributes: {
    title: 'Game 2',
    backgroundColor: '#888',
    description: 'Game 2 description',
    mapImageUrl: '/',
  },
};

export const mockedGame = mockedGame1;

export const mockedGames: GameData[] = [mockedGame1, mockedGame2];
