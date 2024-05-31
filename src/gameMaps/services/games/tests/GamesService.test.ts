import { Firestore } from '@/common/lib/firebase/types';

import { mockDBCallStack } from '@/common/tests/helpers';
import { mockedGame } from '@/gameMaps/types/mocks';

import GamesService from '../GamesService';

describe('GamesService', () => {
  afterEach(() => {
    GamesService.clearInstanceForTest();
  });

  describe('getAll', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).get()',
        {
          docs: [{ id: '1', data: () => ({ title: 'doc 1' }) }],
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2] = mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = [{ id: '1', attributes: { title: 'doc 1' } }];
      // Act
      const result = await gamesService.getAll('uid');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const [mockedDb] = mockDBCallStack('collection()', {
          doc: () => {
            throw Error('Error happened');
          },
        });

        const gamesService = GamesService.getInstance(
          mockedDb as unknown as Firestore
        );
        // Act
        // Assert
        expect(async () => {
          await gamesService.getAll('uid');
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('getOne', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(id).get()',
        {
          id: '1',
          data: () => ({ title: 'doc 1' }),
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = { id: '1', attributes: { title: 'doc 1' } };
      // Act
      const result = await gamesService.getOne('uid', 'id');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith('id');
    });

    describe('when receives error', () => {
      test('throws error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happened');
          },
        } as unknown as Firestore;

        const gamesService = GamesService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await gamesService.getOne('uid', 'id');
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('create', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).add()',
        {
          id: '1',
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2, mockedAdd1] =
        mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedGame,
      };
      // Act
      const result = await gamesService.create('uid', mockedGame.attributes);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedAdd1).toHaveBeenCalledWith(mockedGame.attributes);
    });

    describe('when receives error', () => {
      test('throws error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happened');
          },
        } as unknown as Firestore;

        const gamesService = GamesService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await gamesService.create('uid', mockedGame.attributes);
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('update', () => {
    const newTitle = 'New Game Title';
    test('returns data', async () => {
      // Arrange
      const updatedAttributes = {
        ...mockedGame.attributes,
        title: newTitle,
      };
      const mockedData = jest.fn(() => updatedAttributes);
      const mockedGet = jest.fn(() => ({ id: '1', data: mockedData }));
      const mockedUpdate = jest.fn(() => ({ id: '1' }));
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(id)',
        {
          get: mockedGet,
          update: mockedUpdate,
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedGame,
        attributes: updatedAttributes,
      };
      // Act
      const result = await gamesService.update('uid', 'id', {
        title: newTitle,
      });
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith('id');
      expect(mockedUpdate).toHaveBeenCalledWith({ title: newTitle });
    });

    describe('when receives error', () => {
      test('throws error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happened');
          },
        } as unknown as Firestore;

        const gamesService = GamesService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await gamesService.update('uid', 'id', { title: newTitle });
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('delete', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(id).delete()',
        {}
      );
      const [
        mockedCollection1,
        mockedDoc1,
        mockedCollection2,
        mockedDoc2,
        mockedDelete,
      ] = mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {};
      // Act
      const result = await gamesService.delete('uid', 'id');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith('id');
      expect(mockedDelete).toHaveBeenCalledWith();
    });

    describe('when receives error', () => {
      test('throws error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happened');
          },
        } as unknown as Firestore;

        const gamesService = GamesService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await gamesService.delete('uid', 'id');
        }).rejects.toThrowError('Error happened');
      });
    });
  });
});
