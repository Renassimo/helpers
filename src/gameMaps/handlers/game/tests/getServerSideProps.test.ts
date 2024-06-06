import { Firestore } from '@/common/lib/firebase/types';

import GamesService from '@/gameMaps/services/games';
import PlaysService from '@/gameMaps/services/plays';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';
import { GetServerSidePropsContextWithAuth } from '@/auth/types';

import getServerSideProps from '../getServerSideProps';

jest.mock('@/gameMaps/services/games');
jest.mock('@/gameMaps/services/plays');

describe('getServerSideProps', () => {
  const mockedDb = 'mockedDb' as unknown as Firestore;
  const mockedContext = {
    user: mockedUser,
    pages: mockedPageInfos,
    db: mockedDb,
    query: { gameId: mockedGame.id },
  };
  const mockedGameData = mockedGame;
  const mockedPlaysData = mockedPlay;

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

    const mockedGetPlays = jest.fn(() => mockedPlaysData);
    const mockedGetPlaysServiceInstance = jest.fn(() => ({
      getAll: mockedGetPlays,
    }));
    (PlaysService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetPlaysServiceInstance
    );

    const expectedResult = {
      props: {
        user: mockedUser,
        pages: mockedPageInfos,
        data: { gameData: mockedGameData, playsData: mockedPlaysData },
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
    expect(mockedGetGame).toHaveBeenCalledWith(mockedUser.uid, mockedGame.id);
    expect(mockedGetPlays).toHaveBeenCalledWith(mockedUser.uid, mockedGame.id);
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
