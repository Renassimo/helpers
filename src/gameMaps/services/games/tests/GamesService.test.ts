import { Firestore } from '@/common/lib/firebase/types';

import { mockDBCallStack } from '@/common/tests/helpers';
import { mockedGame } from '@/gameMaps/types/mocks';

import { getStorage } from 'firebase-admin/storage';

import GamesService from '../GamesService';

jest.mock('firebase-admin/storage');

describe('GamesService', () => {
  const mockedSignedUrl = 'mocked-signed-url';
  const mockedGetSignedUrl = jest.fn(() => [mockedSignedUrl]);
  const mockedDelete = jest.fn();
  const mockedFile = jest.fn(() => ({
    getSignedUrl: mockedGetSignedUrl,
    delete: mockedDelete,
  }));
  const mockedBucket = jest.fn(() => ({
    file: mockedFile,
  }));
  const mockedStorage = {
    bucket: mockedBucket,
  };
  const mockedGetStorage = jest.fn(() => mockedStorage);
  afterEach(() => {
    GamesService.clearInstanceForTest();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (getStorage as unknown as jest.Mock).mockImplementation(mockedGetStorage);
  });

  describe('getAll', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).orderBy().get()',
        {
          docs: [
            {
              id: 'gm1',
              data: () => ({ title: 'doc 1', someExtra: 'will not passed' }),
            },
          ],
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2, mockedOrderBy] =
        mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = [
        {
          id: 'gm1',
          attributes: {
            title: 'doc 1',
            description: '',
            backgroundColor: '',
            mapImageRatio: null,
          },
        },
      ];
      // Act
      const result = await gamesService.getAll('uid');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedOrderBy).toHaveBeenCalledWith('title');
      expect(mockedFile).not.toHaveBeenCalled();
      expect(mockedBucket).not.toHaveBeenCalled();
      expect(mockedDelete).not.toHaveBeenCalled();
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
          id: 'gm1',
          data: () => ({
            title: 'doc 1',
            someExtra: 'will not passed',
            mapImageId: 'map-image-id',
          }),
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        id: 'gm1',
        attributes: {
          title: 'doc 1',
          description: '',
          backgroundColor: '',
          mapImageUrl: mockedSignedUrl,
          mapImageRatio: null,
        },
      };
      // Act
      const result = await gamesService.getOne('uid', 'gm1');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith('gm1');
      expect(mockedFile).toHaveBeenCalledWith('map-image-id');
      expect(mockedBucket).toHaveBeenCalledWith('');
      expect(mockedDelete).not.toHaveBeenCalled();
    });

    describe('when requested with withMapImageId', () => {
      test('returns data with withMapImageId', async () => {
        // Arrange
        const [mockedDb, mockedDbFuncs] = mockDBCallStack(
          'collection(gameMaps).doc(uid).collection(games).doc(id).get()',
          {
            id: 'gm1',
            data: () => ({
              title: 'doc 1',
              someExtra: 'will not passed',
              mapImageId: 'map-image-id',
            }),
          }
        );
        const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
          mockedDbFuncs;

        const gamesService = GamesService.getInstance(
          mockedDb as unknown as Firestore
        );
        const expectedResult = {
          id: 'gm1',
          attributes: {
            title: 'doc 1',
            description: '',
            backgroundColor: '',
            mapImageId: 'map-image-id',
            mapImageRatio: null,
          },
        };
        // Act
        const result = await gamesService.getOne('uid', 'gm1', true);
        // Assert
        expect(result).toEqual(expectedResult);
        expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
        expect(mockedDoc1).toHaveBeenCalledWith('uid');
        expect(mockedCollection2).toHaveBeenCalledWith('games');
        expect(mockedDoc2).toHaveBeenCalledWith('gm1');
        expect(mockedFile).not.toHaveBeenCalled();
        expect(mockedBucket).not.toHaveBeenCalled();
        expect(mockedDelete).not.toHaveBeenCalled();
      });
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
          await gamesService.getOne('uid', 'gm1');
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('create', () => {
    test('returns data', async () => {
      // Arrange
      const mockedAdd = jest.fn(() => ({
        id: 'gm1',
      }));
      const mockedDoc2 = jest.fn(
        jest.fn(() => ({
          get: jest.fn(() => ({
            id: 'gm1',
            data: () => ({
              someExtra: 'will not passed',
              mapImageId: 'map-image-id',
              mapImageRatio: 2,
              ...mockedGame.attributes,
            }),
          })),
        }))
      );
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games)',
        {
          add: mockedAdd,
          doc: mockedDoc2,
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2] = mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedGame,
        attributes: {
          ...mockedGame.attributes,
          mapImageUrl: undefined,
          mapImageRatio: 2,
        },
      };
      // Act
      const result = await gamesService.create('uid', {
        ...mockedGame.attributes,
        mapImageId: 'map-image-id',
        mapImageRatio: 2,
      });
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith('gm1');
      expect(mockedAdd).toHaveBeenCalledWith({
        ...mockedGame.attributes,
        mapImageId: 'map-image-id',
        mapImageUrl: undefined,
        mapImageRatio: 2,
      });
      expect(mockedFile).not.toHaveBeenCalled();
      expect(mockedBucket).not.toHaveBeenCalled();
      expect(mockedDelete).not.toHaveBeenCalled();
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
        mapImageRatio: 2,
        someExtra: 'will not passed',
      };
      const mockedData = jest.fn(() => updatedAttributes);
      const mockedGet = jest.fn(() => ({ id: 'gm1', data: mockedData }));
      const mockedUpdate = jest.fn(() => ({ id: 'gm1' }));
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
        attributes: {
          ...mockedGame.attributes,
          title: newTitle,
          mapImageUrl: '',
          mapImageRatio: 2,
        },
      };
      // Act
      const result = await gamesService.update('uid', 'gm1', {
        title: newTitle,
      });
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith('gm1');
      expect(mockedUpdate).toHaveBeenCalledWith({ title: newTitle });
      expect(mockedFile).not.toHaveBeenCalled();
      expect(mockedBucket).not.toHaveBeenCalled();
      expect(mockedDelete).not.toHaveBeenCalled();
    });

    describe('when image changed', () => {
      test('returns data and deletes old image', async () => {
        // Arrange
        const updatedAttributes = {
          ...mockedGame.attributes,
          title: newTitle,
          someExtra: 'will not passed',
          mapImageId: 'map-image-id',
        };
        const mockedData = jest.fn(() => updatedAttributes);
        const mockedGet = jest.fn(() => ({ id: 'gm1', data: mockedData }));
        const mockedUpdate = jest.fn(() => ({ id: 'gm1' }));
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
          attributes: {
            ...mockedGame.attributes,
            title: newTitle,
            mapImageUrl: 'mocked-signed-url',
            mapImageRatio: null,
          },
        };
        // Act
        const result = await gamesService.update('uid', 'gm1', {
          title: newTitle,
          mapImageId: 'new-map-image-id',
        });
        // Assert
        expect(result).toEqual(expectedResult);
        expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
        expect(mockedDoc1).toHaveBeenCalledWith('uid');
        expect(mockedCollection2).toHaveBeenCalledWith('games');
        expect(mockedDoc2).toHaveBeenCalledWith('gm1');
        expect(mockedUpdate).toHaveBeenCalledWith({
          title: newTitle,
          mapImageId: 'new-map-image-id',
        });
        expect(mockedFile).toHaveBeenCalledWith('map-image-id');
        expect(mockedBucket).toHaveBeenCalled();
        expect(mockedDelete).toHaveBeenCalledWith({ ignoreNotFound: true });
      });
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
          await gamesService.update('uid', 'gm1', { title: newTitle });
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('delete', () => {
    test('deletes data and deletes image', async () => {
      // Arrange
      const mockedData = jest.fn(() => ({
        ...mockedGame.attributes,
        mapImageId: 'map-image-id',
      }));
      const mockedGet = jest.fn(() => ({ id: 'gm1', data: mockedData }));

      const mockedDocRef = { ref: 'Mocked Doc Ref', get: mockedGet };
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(id)',
        mockedDocRef
      );
      const mockedRecursiveDelete = jest.fn();
      // @ts-ignore
      mockedDb.recursiveDelete = mockedRecursiveDelete;
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const gamesService = GamesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {};
      // Act
      const result = await gamesService.delete('uid', 'gm1');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith('gm1');
      expect(mockedRecursiveDelete).toHaveBeenCalledWith(mockedDocRef);
      expect(mockedFile).toHaveBeenCalledWith('map-image-id');
      expect(mockedBucket).toHaveBeenCalled();
      expect(mockedDelete).toHaveBeenCalledWith({ ignoreNotFound: true });
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
          await gamesService.delete('uid', 'gm1');
        }).rejects.toThrowError('Error happened');
      });
    });
  });
});
