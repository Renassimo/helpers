import { Firestore } from '@/common/lib/firebase/types';

import { mockDBCallStack } from '@/common/tests/helpers';
import { mockedItem } from '@/gameMaps/types/mocks';

import ItemsService from '../ItemsService';

describe('ItemsService', () => {
  afterEach(() => {
    ItemsService.clearInstanceForTest();
  });

  describe('getAll', () => {
    test('returns data', async () => {
      // Arrange
      const mockedPlayId = 'pl1';
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).where(query).get()',
        {
          docs: [{ id: 'it1', data: () => ({ title: 'doc 1' }) }],
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2, mockedWhere] =
        mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = [{ id: 'it1', attributes: { title: 'doc 1' } }];
      // Act
      const result = await categorieService.getAll('uid', mockedPlayId);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('items');
      expect(mockedWhere).toHaveBeenCalledWith('playId', '==', mockedPlayId);
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const mockedPlayId = 'pl1';
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
          await itemsService.getAll('uid', mockedPlayId);
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('getOne', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).doc(id).get()',
        {
          id: 'it1',
          data: () => ({ title: 'doc 1' }),
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = { id: 'it1', attributes: { title: 'doc 1' } };
      // Act
      const result = await categorieService.getOne('uid', 'it1');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('items');
      expect(mockedDoc2).toHaveBeenCalledWith('it1');
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
          await categorieService.getOne('uid', 'it1');
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('create', () => {
    test('returns data', async () => {
      // Arrange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).add()',
        {
          id: 'it1',
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2, mockedAdd1] =
        mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedItem,
      };
      // Act
      const result = await categorieService.create(
        'uid',
        mockedItem.attributes
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('items');
      expect(mockedAdd1).toHaveBeenCalledWith(mockedItem.attributes);
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
          await categorieService.create('uid', mockedItem.attributes);
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('update', () => {
    const newDescription = 'New Item Description';
    test('returns data', async () => {
      // Arrange
      const updatedAttributes = {
        ...mockedItem.attributes,
        description: newDescription,
      };
      const mockedData = jest.fn(() => updatedAttributes);
      const mockedGet = jest.fn(() => ({ id: 'it1', data: mockedData }));
      const mockedUpdate = jest.fn(() => ({ id: 'it1' }));
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).doc(id)',
        {
          get: mockedGet,
          update: mockedUpdate,
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedItem,
        attributes: updatedAttributes,
      };
      // Act
      const result = await categorieService.update('uid', 'it1', {
        description: newDescription,
      });
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('items');
      expect(mockedDoc2).toHaveBeenCalledWith('it1');
      expect(mockedUpdate).toHaveBeenCalledWith({
        description: newDescription,
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
          await categorieService.update('uid', 'it1', {
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

      const categorieService = ItemsService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {};
      // Act
      const result = await categorieService.delete('uid', 'it1');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('items');
      expect(mockedDoc2).toHaveBeenCalledWith('it1');
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
          await categorieService.delete('uid', 'it1');
        }).rejects.toThrowError('Error happened');
      });
    });
  });
});
