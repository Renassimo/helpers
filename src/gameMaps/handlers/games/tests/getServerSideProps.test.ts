import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { Firestore } from '@/common/lib/firebase/types';

import GamesService from '@/gameMaps/services/games';

import getServerSideProps from '../getServerSideProps';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedGames } from '@/gameMaps/types/mocks';

jest.mock('@/gameMaps/services/games');

describe('getServerSideProps', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    const mockedDb = 'mockedDb' as unknown as Firestore;
    const mockedContext = {
      user: mockedUser,
      pages: mockedPageInfos,
      db: mockedDb,
    };
    const mockedData = { data: mockedGames, error: null };

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
  });
});
