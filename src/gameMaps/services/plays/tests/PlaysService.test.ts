import { Firestore } from '@/common/lib/firebase/types';

import { mockDBCallStack } from '@/common/tests/helpers';
import { mockedPlay } from '@/gameMaps/types/mocks';

import PlaysService from '../PlaysService';

describe('PlaysService', () => {
  afterEach(() => {
    PlaysService.clearInstanceForTest();
  });

  describe('getAll', () => {
    test('returns data', async () => {
      // Arrange
      const mockedGameId = 'game1';
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).where(query).get()',
        {
          docs: [{ id: '1', data: () => ({ title: 'doc 1' }) }],
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2, mockedWhere] =
        mockedDbFuncs;

      const playsService = PlaysService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        data: [{ id: '1', attributes: { title: 'doc 1' } }],
        error: null,
      };
      // Act
      const result = await playsService.getAll('uid', mockedGameId);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('plays');
      expect(mockedWhere).toHaveBeenCalledWith('gameId', '==', mockedGameId);
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const mockedGameId = 'game1';
        const [mockedDb] = mockDBCallStack('collection()', {
          doc: () => {
            throw Error('Error happend');
          },
        });

        const playsService = PlaysService.getInstance(
          mockedDb as unknown as Firestore
        );
        const expectedResult = {
          data: null,
          error: { message: 'Error happend' },
        };
        // Act
        const result = await playsService.getAll('uid', mockedGameId);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getOne', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).doc(id).get()',
        {
          id: '1',
          data: () => ({ title: 'doc 1' }),
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const playsService = PlaysService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        data: { id: '1', attributes: { title: 'doc 1' } },
        error: null,
      };
      // Act
      const result = await playsService.getOne('uid', 'id');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('plays');
      expect(mockedDoc2).toHaveBeenCalledWith('id');
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happend');
          },
        } as unknown as Firestore;

        const playsService = PlaysService.getInstance(mockedDb);
        const expectedResult = {
          data: null,
          error: { message: 'Error happend' },
        };
        // Act
        const result = await playsService.getOne('uid', 'id');
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('create', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).add()',
        {
          id: '1',
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2, mockedAdd1] =
        mockedDbFuncs;

      const playsService = PlaysService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        data: mockedPlay,
      };
      // Act
      const result = await playsService.create('uid', mockedPlay.attributes);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('plays');
      expect(mockedAdd1).toHaveBeenCalledWith(mockedPlay.attributes);
    });

    describe('when receives error', () => {
      test('throws error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happened');
          },
        } as unknown as Firestore;

        const playsService = PlaysService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await playsService.create('uid', mockedPlay.attributes);
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('update', () => {
    const newTitle = 'New Game Title';
    test('returns data', async () => {
      // Arrange
      const updatedAttributes = {
        ...mockedPlay.attributes,
        title: newTitle,
      };
      const mockedData = jest.fn(() => updatedAttributes);
      const mockedGet = jest.fn(() => ({ id: '1', data: mockedData }));
      const mockedUpdate = jest.fn(() => ({ id: '1' }));
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).doc(id)',
        {
          get: mockedGet,
          update: mockedUpdate,
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const playsService = PlaysService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        data: {
          ...mockedPlay,
          attributes: updatedAttributes,
        },
      };
      // Act
      const result = await playsService.update('uid', 'id', {
        title: newTitle,
      });
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('plays');
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

        const playsService = PlaysService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await playsService.update('uid', 'id', { title: newTitle });
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('delete', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).doc(id).delete()',
        {}
      );
      const [
        mockedCollection1,
        mockedDoc1,
        mockedCollection2,
        mockedDoc2,
        mockedDelete,
      ] = mockedDbFuncs;

      const playsService = PlaysService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {};
      // Act
      const result = await playsService.delete('uid', 'id');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('plays');
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

        const playsService = PlaysService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await playsService.delete('uid', 'id');
        }).rejects.toThrowError('Error happened');
      });
    });
  });
});
