import { Firestore } from '@/common/lib/firebase/types';

import { mockDBCallStack } from '@/common/tests/helpers';
import { mockedItem } from '@/gameMaps/types/mocks';

import ItemsService from '../ItemsService';

describe('ItemsService', () => {
  afterEach(() => {
    ItemsService.clearInstanceForTest();
  });
  const mockedGameId = 'gm1';
  const mockedPlayId = 'pl1';
  const mockedCategoryId = 'cat1';

  describe('getAll', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(gameId).collection(items).get()',
        {
          docs: [
            {
              id: 'it1',
              data: () => ({
                description: mockedItem.attributes.description,
                categoryId: mockedItem.attributes.categoryId,
                coordinates: mockedItem.attributes.coordinates,
                collectedByPlayId: {
                  [mockedItem.attributes.playId!]:
                    mockedItem.attributes.collected,
                },
              }),
            },
          ],
        }
      );
      const [
        mockedCollection1,
        mockedDoc1,
        mockedCollection2,
        mockedDoc2,
        mockedCollection3,
      ] = mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = [
        {
          id: 'it1',
          attributes: {
            description: mockedItem.attributes.description,
            categoryId: mockedItem.attributes.categoryId,
            coordinates: mockedItem.attributes.coordinates,
            playId: mockedItem.attributes.playId,
            collected: mockedItem.attributes.collected,
          },
        },
      ];
      // Act
      const result = await categorieService.getAll(
        'uid',
        mockedGameId,
        mockedPlayId
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith(mockedGameId);
      expect(mockedCollection3).toHaveBeenCalledWith('items');
    });

    describe('when filters by category', () => {
      test('returns data', async () => {
        // Arrange
        const [mockedDb, mockedDbFuncs] = mockDBCallStack(
          'collection(gameMaps).doc(uid).collection(games).doc(gameId).collection(items).where(query).get()',
          {
            docs: [{ id: 'it1', data: () => ({ title: 'doc 1' }) }],
          }
        );
        const [
          mockedCollection1,
          mockedDoc1,
          mockedCollection2,
          mockedDoc2,
          mockedCollection3,
          mockedWhere,
        ] = mockedDbFuncs;

        const categorieService = ItemsService.getInstance(
          mockedDb as unknown as Firestore
        );
        const expectedResult = [{ id: 'it1' }];
        // Act
        const result = await categorieService.getAllByCategory(
          'uid',
          mockedGameId,
          mockedCategoryId
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
        expect(mockedDoc1).toHaveBeenCalledWith('uid');
        expect(mockedCollection2).toHaveBeenCalledWith('games');
        expect(mockedDoc2).toHaveBeenCalledWith(mockedGameId);
        expect(mockedCollection3).toHaveBeenCalledWith('items');
        expect(mockedWhere).toHaveBeenCalledWith(
          'categoryId',
          '==',
          mockedCategoryId
        );
      });
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const [mockedDb] = mockDBCallStack('collection()', {
          doc: () => {
            throw Error('Error happened');
          },
        });

        const itemsService = ItemsService.getInstance(
          mockedDb as unknown as Firestore
        );
        // Act
        // Assert
        expect(async () => {
          await itemsService.getAll('uid', mockedGameId, mockedPlayId);
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('getOne', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(gameId).collection(items).doc(id).get()',
        {
          id: 'it1',
          data: () => ({
            description: mockedItem.attributes.description,
            categoryId: mockedItem.attributes.categoryId,
            coordinates: mockedItem.attributes.coordinates,
            collectedByPlayId: {
              [mockedItem.attributes.playId!]: mockedItem.attributes.collected,
            },
          }),
        }
      );
      const [
        mockedCollection1,
        mockedDoc1,
        mockedCollection2,
        mockedDoc2,
        mockedCollection3,
        mockedDoc3,
      ] = mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        id: 'it1',
        attributes: {
          description: mockedItem.attributes.description,
          categoryId: mockedItem.attributes.categoryId,
          coordinates: mockedItem.attributes.coordinates,
          playId: mockedItem.attributes.playId,
          collected: mockedItem.attributes.collected,
        },
      };
      // Act
      const result = await categorieService.getOne(
        'uid',
        mockedGameId,
        'it1',
        mockedItem.attributes.playId
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith(mockedGameId);
      expect(mockedCollection3).toHaveBeenCalledWith('items');
      expect(mockedDoc3).toHaveBeenCalledWith('it1');
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happened');
          },
        } as unknown as Firestore;

        const categorieService = ItemsService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await categorieService.getOne('uid', mockedGameId, 'it1');
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('create', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(gameId).collection(items).add()',
        {
          id: 'it1',
        }
      );
      const [
        mockedCollection1,
        mockedDoc1,
        mockedCollection2,
        mockedDoc2,
        mockedCollection3,
        mockedAdd1,
      ] = mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedItem,
      };
      // Act
      const result = await categorieService.create(
        'uid',
        mockedGameId,
        mockedItem.attributes
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith(mockedGameId);
      expect(mockedCollection3).toHaveBeenCalledWith('items');
      expect(mockedAdd1).toHaveBeenCalledWith({
        description: mockedItem.attributes.description,
        categoryId: mockedItem.attributes.categoryId,
        coordinates: mockedItem.attributes.coordinates,
        collectedByPlayId: {
          [mockedItem.attributes.playId!]: mockedItem.attributes.collected,
        },
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

        const categorieService = ItemsService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await categorieService.create(
            'uid',
            mockedGameId,
            mockedItem.attributes
          );
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('update', () => {
    const newDescription = 'New Item Description';
    test('returns data', async () => {
      // Arrange
      const updatedAttributes = {
        description: newDescription,
        categoryId: mockedItem.attributes.categoryId,
        coordinates: mockedItem.attributes.coordinates,
        collectedByPlayId: {
          [mockedItem.attributes.playId!]: mockedItem.attributes.collected,
        },
      };
      const mockedData = jest.fn(() => updatedAttributes);
      const mockedGet = jest.fn(() => ({ id: 'it1', data: mockedData }));
      const mockedUpdate = jest.fn(() => ({ id: 'it1' }));
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(gameId).collection(items).doc(id)',
        {
          get: mockedGet,
          update: mockedUpdate,
        }
      );
      const [
        mockedCollection1,
        mockedDoc1,
        mockedCollection2,
        mockedDoc2,
        mockedCollection3,
        mockedDoc3,
      ] = mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedItem,
        attributes: {
          description: newDescription,
          categoryId: mockedItem.attributes.categoryId,
          coordinates: mockedItem.attributes.coordinates,
          playId: mockedItem.attributes.playId,
          collected: mockedItem.attributes.collected,
        },
      };
      // Act
      const result = await categorieService.update('uid', mockedGameId, 'it1', {
        description: newDescription,
        categoryId: mockedItem.attributes.categoryId,
        playId: mockedItem.attributes.playId,
        collected: mockedItem.attributes.collected,
      });
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith(mockedGameId);
      expect(mockedCollection3).toHaveBeenCalledWith('items');
      expect(mockedDoc3).toHaveBeenCalledWith('it1');
      expect(mockedUpdate).toHaveBeenCalledWith({
        description: newDescription,
        categoryId: mockedItem.attributes.categoryId,
        [`collectedByPlayId.${mockedItem.attributes.playId}`]:
          mockedItem.attributes.collected,
      });
    });

    describe('when updates only coordinates', () => {
      test('returns data', async () => {
        // Arrange
        const updatedAttributes = {
          description: newDescription,
          categoryId: mockedItem.attributes.categoryId,
          coordinates: mockedItem.attributes.coordinates,
          collectedByPlayId: {
            [mockedItem.attributes.playId!]: mockedItem.attributes.collected,
          },
        };
        const mockedData = jest.fn(() => updatedAttributes);
        const mockedGet = jest.fn(() => ({ id: 'it1', data: mockedData }));
        const mockedUpdate = jest.fn(() => ({ id: 'it1' }));
        const [mockedDb, mockedDbFuncs] = mockDBCallStack(
          'collection(gameMaps).doc(uid).collection(games).doc(gameId).collection(items).doc(id)',
          {
            get: mockedGet,
            update: mockedUpdate,
          }
        );
        const [
          mockedCollection1,
          mockedDoc1,
          mockedCollection2,
          mockedDoc2,
          mockedCollection3,
          mockedDoc3,
        ] = mockedDbFuncs;

        const categorieService = ItemsService.getInstance(
          mockedDb as unknown as Firestore
        );
        const expectedResult = {
          ...mockedItem,
          attributes: {
            description: newDescription,
            categoryId: mockedItem.attributes.categoryId,
            coordinates: mockedItem.attributes.coordinates,
            playId: mockedItem.attributes.playId,
            collected: mockedItem.attributes.collected,
          },
        };
        // Act
        const result = await categorieService.update(
          'uid',
          mockedGameId,
          'it1',
          {
            coordinates: mockedItem.attributes.coordinates,
            playId: mockedItem.attributes.playId,
          }
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
        expect(mockedDoc1).toHaveBeenCalledWith('uid');
        expect(mockedCollection2).toHaveBeenCalledWith('games');
        expect(mockedDoc2).toHaveBeenCalledWith(mockedGameId);
        expect(mockedCollection3).toHaveBeenCalledWith('items');
        expect(mockedDoc3).toHaveBeenCalledWith('it1');
        expect(mockedUpdate).toHaveBeenCalledWith({
          coordinates: mockedItem.attributes.coordinates,
        });
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

        const categorieService = ItemsService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await categorieService.update('uid', mockedGameId, 'it1', {
            description: newDescription,
          });
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('delete', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(games).doc(gameId).collection(items).doc(id).delete()',
        {}
      );
      const [
        mockedCollection1,
        mockedDoc1,
        mockedCollection2,
        mockedDoc2,
        mockedCollection3,
        mockedDoc3,
        mockedDelete,
      ] = mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {};
      // Act
      const result = await categorieService.delete('uid', mockedGameId, 'it1');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('games');
      expect(mockedDoc2).toHaveBeenCalledWith(mockedGameId);
      expect(mockedCollection3).toHaveBeenCalledWith('items');
      expect(mockedDoc3).toHaveBeenCalledWith('it1');
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

        const categorieService = ItemsService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await categorieService.delete('uid', mockedGameId, 'it1');
        }).rejects.toThrowError('Error happened');
      });
    });
  });
});
