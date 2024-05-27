import { Firestore } from '@/common/lib/firebase/types';

import GamesService from '../GamesService';

describe('GamesService', () => {
  afterEach(() => {
    GamesService.clearInstanceForTest();
  });
  describe('getAll', () => {
    test('returns data', async () => {
      // Arrange
      const mockedDb = {
        collection: () => ({
          doc: () => ({
            collection: () => ({
              get: () => ({
                docs: [{ id: '1', data: () => ({ title: 'doc 1' }) }],
              }),
            }),
          }),
        }),
      } as unknown as Firestore;

      const gamesService = GamesService.getInstance(mockedDb);
      const expectedResult = {
        data: [{ id: '1', attributes: { title: 'doc 1' } }],
        error: null,
      };
      // Act
      const result = await gamesService.getAll('uid');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => ({
            doc: () => ({
              collection: () => ({
                get: () => {
                  throw Error('Error happend');
                },
              }),
            }),
          }),
        } as unknown as Firestore;

        const gamesService = GamesService.getInstance(mockedDb);
        const expectedResult = {
          data: null,
          error: { message: 'Error happend' },
        };
        // Act
        const result = await gamesService.getAll('uid');
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
