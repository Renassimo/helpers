import { Firestore } from '@/common/lib/firebase/types';

import GamesService from '@/gameMaps/services/games';
import PlaysService from '@/gameMaps/services/plays';
import CategoriesService from '@/gameMaps/services/categories';
import ItemsService from '@/gameMaps/services/items';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import {
  mockedCategories,
  mockedGame,
  mockedItems,
  mockedPlay,
} from '@/gameMaps/types/mocks';
import { GetServerSidePropsContextWithAuth } from '@/auth/types';

import getServerSideProps from '../getServerSideProps';

jest.mock('@/gameMaps/services/games');
jest.mock('@/gameMaps/services/plays');
jest.mock('@/gameMaps/services/categories');
jest.mock('@/gameMaps/services/items');

describe('getServerSideProps', () => {
  const mockedDb = 'mockedDb' as unknown as Firestore;
  const mockedContext = {
    user: mockedUser,
    pages: mockedPageInfos,
    db: mockedDb,
    query: { gameId: mockedGame.id, playId: mockedPlay.id },
  };
  const mockedGameData = mockedGame;
  const mockedPlayData = mockedPlay;
  const mockedCategoriesData = mockedCategories;
  const mockedItemsData = mockedItems;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns data', async () => {
    // Arange
    const mockedGetGame = jest.fn(() => mockedGameData);
    const mockedGetGamesServiceInstance = jest.fn(() => ({
      getOne: mockedGetGame,
    }));
    (GamesService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetGamesServiceInstance
    );

    const mockedGetPlay = jest.fn(() => mockedPlayData);
    const mockedGetPlaysServiceInstance = jest.fn(() => ({
      getOne: mockedGetPlay,
    }));
    (PlaysService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetPlaysServiceInstance
    );

    const mockedGetCategories = jest.fn(() => mockedCategoriesData);
    const mockedGetCategoriesServiceInstance = jest.fn(() => ({
      getAll: mockedGetCategories,
    }));
    (
      CategoriesService.getInstance as unknown as jest.Mock
    ).mockImplementationOnce(mockedGetCategoriesServiceInstance);

    const mockedGetItems = jest.fn(() => mockedItemsData);
    const mockedGetItemsServiceInstance = jest.fn(() => ({
      getAll: mockedGetItems,
    }));
    (ItemsService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetItemsServiceInstance
    );

    const expectedResult = {
      props: {
        user: mockedUser,
        pages: mockedPageInfos,
        data: {
          gameData: mockedGameData,
          playData: mockedPlayData,
          categoriesData: mockedCategoriesData,
          itemsData: mockedItemsData,
        },
        error: null,
      },
    };
    // Act
    const result = await getServerSideProps(
      mockedContext as unknown as GetServerSidePropsContextWithAuth
    );
    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockedGetGamesServiceInstance).toHaveBeenCalledWith(mockedDb);
    expect(mockedGetPlaysServiceInstance).toHaveBeenCalledWith(mockedDb);
    expect(mockedGetCategoriesServiceInstance).toHaveBeenCalledWith(mockedDb);
    expect(mockedGetItemsServiceInstance).toHaveBeenCalledWith(mockedDb);
    expect(mockedGetGame).toHaveBeenCalledWith(mockedUser.uid, mockedGame.id);
    expect(mockedGetPlay).toHaveBeenCalledWith(
      mockedUser.uid,
      mockedGame.id,
      mockedPlay.id
    );
    expect(mockedGetCategories).toHaveBeenCalledWith(
      mockedUser.uid,
      mockedGame.id
    );
    expect(mockedGetItems).toHaveBeenCalledWith(
      mockedUser.uid,
      mockedGame.id,
      mockedPlay.id
    );
  });

  describe('when receives an error', () => {
    test('returns error', async () => {
      // Arange
      const mockedErrorText = 'Mocked error';
      const mockedErrorBody = { message: mockedErrorText };
      const mockedError = new Error(mockedErrorText);
      const mockedDeserializeError = jest.fn(() => mockedErrorBody);
      const mockedGetGamesServiceInstance = jest.fn(() => ({
        getOne: jest.fn(() => {
          throw mockedError;
        }),
        deserializeError: mockedDeserializeError,
      }));
      (GamesService.getInstance as unknown as jest.Mock).mockImplementationOnce(
        mockedGetGamesServiceInstance
      );

      const expectedResult = {
        props: {
          user: mockedUser,
          pages: mockedPageInfos,
          data: null,
          error: mockedErrorBody,
        },
      };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContextWithAuth
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedDeserializeError).toHaveBeenCalledWith(mockedError);
    });
  });
});
