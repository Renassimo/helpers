import { Firestore } from '@/common/lib/firebase/types';

import { mockDBCallStack } from '@/common/tests/helpers';
import { mockedCategory } from '@/gameMaps/types/mocks';

import CategoriesService from '../CategoriesService';

describe('CategoriesService', () => {
  afterEach(() => {
    CategoriesService.clearInstanceForTest();
  });

  describe('getAll', () => {
    test('returns data', async () => {
      // Arrange
      const mockedGameId = 'gm1';
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).where(query).get()',
        {
          docs: [{ id: 'cat1', data: () => ({ title: 'doc 1' }) }],
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2, mockedWhere] =
        mockedDbFuncs;

      const categorieService = CategoriesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = [{ id: 'cat1', attributes: { title: 'doc 1' } }];
      // Act
      const result = await categorieService.getAll('uid', mockedGameId);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('categories');
      expect(mockedWhere).toHaveBeenCalledWith('gameId', '==', mockedGameId);
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const mockedGameId = 'gm1';
        const [mockedDb] = mockDBCallStack('collection()', {
          doc: () => {
            throw Error('Error happened');
          },
        });

        const categoriesService = CategoriesService.getInstance(
          mockedDb as unknown as Firestore
        );
        // Act
        // Assert
        expect(async () => {
          await categoriesService.getAll('uid', mockedGameId);
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
          id: 'cat1',
          data: () => ({ title: 'doc 1' }),
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const categorieService = CategoriesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = { id: 'cat1', attributes: { title: 'doc 1' } };
      // Act
      const result = await categorieService.getOne('uid', 'cat1');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('categories');
      expect(mockedDoc2).toHaveBeenCalledWith('cat1');
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happened');
          },
        } as unknown as Firestore;

        const categorieService = CategoriesService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await categorieService.getOne('uid', 'cat1');
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
          id: 'cat1',
        }
      );
      const [mockedCollection1, mockedDoc, mockedCollection2, mockedAdd1] =
        mockedDbFuncs;

      const categorieService = CategoriesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedCategory,
      };
      // Act
      const result = await categorieService.create(
        'uid',
        mockedCategory.attributes
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('categories');
      expect(mockedAdd1).toHaveBeenCalledWith(mockedCategory.attributes);
    });

    describe('when receives error', () => {
      test('throws error', async () => {
        // Arrange
        const mockedDb = {
          collection: () => {
            throw Error('Error happened');
          },
        } as unknown as Firestore;

        const categorieService = CategoriesService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await categorieService.create('uid', mockedCategory.attributes);
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('update', () => {
    const newTitle = 'New Game Title';
    test('returns data', async () => {
      // Arrange
      const updatedAttributes = {
        ...mockedCategory.attributes,
        title: newTitle,
      };
      const mockedData = jest.fn(() => updatedAttributes);
      const mockedGet = jest.fn(() => ({ id: 'cat1', data: mockedData }));
      const mockedUpdate = jest.fn(() => ({ id: 'cat1' }));
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(gameMaps).doc(uid).collection(plays).doc(id)',
        {
          get: mockedGet,
          update: mockedUpdate,
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2, mockedDoc2] =
        mockedDbFuncs;

      const categorieService = CategoriesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {
        ...mockedCategory,
        attributes: updatedAttributes,
      };
      // Act
      const result = await categorieService.update('uid', 'cat1', {
        title: newTitle,
      });
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('categories');
      expect(mockedDoc2).toHaveBeenCalledWith('cat1');
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

        const categorieService = CategoriesService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await categorieService.update('uid', 'cat1', { title: newTitle });
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

      const categorieService = CategoriesService.getInstance(
        mockedDb as unknown as Firestore
      );
      const expectedResult = {};
      // Act
      const result = await categorieService.delete('uid', 'cat1');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('gameMaps');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('categories');
      expect(mockedDoc2).toHaveBeenCalledWith('cat1');
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

        const categorieService = CategoriesService.getInstance(mockedDb);
        // Act
        // Assert
        expect(async () => {
          await categorieService.delete('uid', 'cat1');
        }).rejects.toThrowError('Error happened');
      });
    });
  });
});
