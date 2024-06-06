import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { Firestore } from '@/common/lib/firebase/types';

import GamesService from '@/gameMaps/services/games';

import getServerSideProps from '../getServerSideProps';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedGames } from '@/gameMaps/types/mocks';

jest.mock('@/gameMaps/services/games');

describe('getServerSideProps', () => {
  const mockedDb = 'mockedDb' as unknown as Firestore;
  const mockedContext = {
    user: mockedUser,
    pages: mockedPageInfos,
    db: mockedDb,
  };
  const mockedData = [...mockedGames];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns data', async () => {
    // Arange
    const mockedGetAll = jest.fn(() => mockedData);
    const mockedGetInstance = jest.fn(() => ({
      getAll: mockedGetAll,
    }));
    (GamesService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetInstance
    );
    const expectedResult = {
      props: {
        user: mockedUser,
        pages: mockedPageInfos,
        data: mockedGames,
        error: null,
      },
    };

    // Act
    const result = await getServerSideProps(
      mockedContext as unknown as GetServerSidePropsContextWithAuth
    );

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockedGetAll).toHaveBeenCalledWith(mockedUser.uid);
    expect(mockedGetInstance).toHaveBeenCalledWith(mockedDb);
  });

  describe('when receives an error', () => {
    test('returns error', async () => {
      // Arange
      const mockedErrorText = 'Mocked error';
      const mockedErrorBody = { message: mockedErrorText };
      const mockedError = new Error(mockedErrorText);
      const mockedDeserializeError = jest.fn(() => mockedErrorBody);
      const mockedGetInstance = jest.fn(() => ({
        getAll: jest.fn(() => {
          throw mockedError;
        }),
        deserializeError: mockedDeserializeError,
      }));
      (GamesService.getInstance as unknown as jest.Mock).mockImplementationOnce(
        mockedGetInstance
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
