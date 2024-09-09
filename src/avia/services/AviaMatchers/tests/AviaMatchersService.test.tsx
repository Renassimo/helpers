import { Firestore } from '@/common/lib/firebase/types';

import { mockDBCallStack } from '@/common/tests/helpers';

import { mockedAviaMatchers } from '@/avia/types/avia/mocks';
import { Avia } from '@/avia/types/avia';

import AviaMatchersService from '../AviaMatchersService';

describe('AviaMatchersService', () => {
  afterEach(() => {
    AviaMatchersService.clearInstanceForTest();
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    test('returns data', async () => {
      // Arange
      const [mockedDb, mockedDbFuncs] = mockDBCallStack(
        'collection(avia).doc(uid).collection(matchers).get()',
        {
          docs: [
            { id: 'airlines', data: () => mockedAviaMatchers.airlines },
            { id: 'airports', data: () => mockedAviaMatchers.airports },
            {
              id: 'manufacturers',
              data: () => mockedAviaMatchers.manufacturers,
            },
            { id: 'models', data: () => mockedAviaMatchers.models },
            { id: 'unsupported', data: () => ({ um1: 'UM1' }) },
          ],
        }
      );
      const [mockedCollection1, mockedDoc1, mockedCollection2] = mockedDbFuncs;
      const aviaMatchersService = AviaMatchersService.getInstance(
        mockedDb as unknown as Firestore
      );

      const expectedResult = mockedAviaMatchers;
      // Act
      const result = await aviaMatchersService.getAll('uid');
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedCollection1).toHaveBeenCalledWith('avia');
      expect(mockedDoc1).toHaveBeenCalledWith('uid');
      expect(mockedCollection2).toHaveBeenCalledWith('matchers');
    });

    describe('when not all correct matchers retreived', () => {
      test('returns data', async () => {
        // Arange
        const [mockedDb, mockedDbFuncs] = mockDBCallStack(
          'collection(avia).doc(uid).collection(matchers).get()',
          {
            docs: [
              { id: 'airlines', data: () => mockedAviaMatchers.airlines },
              {
                id: 'manufacturers',
                data: () => null,
              },
              { id: 'models', data: () => [] },
            ],
          }
        );
        const [mockedCollection1, mockedDoc1, mockedCollection2] =
          mockedDbFuncs;
        const aviaMatchersService = AviaMatchersService.getInstance(
          mockedDb as unknown as Firestore
        );

        const expectedResult: Avia.Matchers = {
          airlines: mockedAviaMatchers.airlines,
          airports: {},
          manufacturers: {},
          models: {},
        };
        // Act
        const result = await aviaMatchersService.getAll('uid');
        // Assert
        expect(result).toEqual(expectedResult);
        expect(mockedCollection1).toHaveBeenCalledWith('avia');
        expect(mockedDoc1).toHaveBeenCalledWith('uid');
        expect(mockedCollection2).toHaveBeenCalledWith('matchers');
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

        const aviaMatchersService = AviaMatchersService.getInstance(
          mockedDb as unknown as Firestore
        );
        // Act
        // Assert
        expect(async () => {
          await aviaMatchersService.getAll('uid');
        }).rejects.toThrowError('Error happened');
      });
    });
  });

  describe('update', () => {
    test('returns data', async () => {
      // Arange
      const mockedRef = 'REF_TO_UPDATE';
      const mockedGet = jest.fn(() => ({
        docs: [
          { id: 'airlines', data: () => mockedAviaMatchers.airlines },
          { id: 'airports', data: () => mockedAviaMatchers.airports },
          {
            id: 'manufacturers',
            data: () => mockedAviaMatchers.manufacturers,
          },
          { id: 'models', data: () => mockedAviaMatchers.models },
        ],
      }));
      const mockedDoc2 = jest.fn(() => mockedRef);
      const mockedCollection2 = jest.fn(() => ({
        doc: mockedDoc2,
        get: mockedGet,
      }));
      const mockedDoc1 = jest.fn(() => ({ collection: mockedCollection2 }));
      const mockedCollection1 = jest.fn(() => ({ doc: mockedDoc1 }));
      const mockedCommit = jest.fn();
      const mockedUpdate = jest.fn();
      const mockedBatch = jest.fn(() => ({
        commit: mockedCommit,
        update: mockedUpdate,
      }));
      const mockedDb = {
        batch: mockedBatch,
        collection: mockedCollection1,
      };
      const aviaMatchersService = AviaMatchersService.getInstance(
        mockedDb as unknown as Firestore
      );
      const mockedAirlinesMatcher = { Aeroflot: 'Aeroflot Russian Airlines' };
      const matchers = {
        airlines: { Aeroflot: 'Aeroflot Russian Airlines' },
        unsupported: { um2: 'UM2' },
        airports: null,
      } as unknown as Avia.Matchers;
      const expectedResult = mockedAviaMatchers;
      // Act
      const result = await aviaMatchersService.update('uid', matchers);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedBatch).toHaveBeenCalledTimes(1);
      expect(mockedBatch).nthCalledWith(1);
      expect(mockedCollection1).toHaveBeenCalledTimes(2);
      expect(mockedCollection1).nthCalledWith(1, 'avia');
      expect(mockedCollection1).nthCalledWith(2, 'avia');
      expect(mockedDoc1).toHaveBeenCalledTimes(2);
      expect(mockedDoc1).nthCalledWith(1, 'uid');
      expect(mockedDoc1).nthCalledWith(2, 'uid');
      expect(mockedCollection2).toHaveBeenCalledTimes(2);
      expect(mockedCollection2).nthCalledWith(1, 'matchers');
      expect(mockedCollection2).nthCalledWith(2, 'matchers');
      expect(mockedDoc2).toHaveBeenCalledTimes(1);
      expect(mockedDoc2).nthCalledWith(1, 'airlines');
      expect(mockedUpdate).toHaveBeenCalledTimes(1);
      expect(mockedUpdate).nthCalledWith(1, mockedRef, mockedAirlinesMatcher);
      expect(mockedCommit).toHaveBeenCalledTimes(1);
      expect(mockedCommit).nthCalledWith(1);
      expect(mockedGet).toHaveBeenCalledTimes(1);
      expect(mockedGet).nthCalledWith(1);
      expect(result).toEqual(mockedAviaMatchers);
    });

    describe('when receives error', () => {
      test('returns error', async () => {
        // Arrange
        const mockedBatch = jest.fn(() => {
          throw Error('Error happened');
        });
        const mockedDb = {
          batch: mockedBatch,
        };

        const aviaMatchersService = AviaMatchersService.getInstance(
          mockedDb as unknown as Firestore
        );
        // Act
        // Assert
        expect(async () => {
          await aviaMatchersService.update('uid', {});
        }).rejects.toThrowError('Error happened');
      });
    });
  });
});
