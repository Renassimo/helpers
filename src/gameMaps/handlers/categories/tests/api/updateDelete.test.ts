import CategoriesService from '@/gameMaps/services/categories';
import ItemsService from '@/gameMaps/services/items';
import { getError } from '@/common/utils/errors';

import {
  mockedGame,
  mockedItems,
  mockedCategory,
} from '@/gameMaps/types/mocks';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import handler from '../../api/updateDelete';

jest.mock('@/gameMaps/services/categories');
jest.mock('@/gameMaps/services/items');
jest.mock('@/common/utils/errors');

describe('updateDelete (category)', () => {
  const mockedMethod = 'PATCH';
  const mockedUid = 'uid';
  const mockedGameId = mockedGame.id;
  const mockedCategoryId = mockedCategory.id;
  const mockedQuery = { gameId: mockedGameId, categoryId: mockedCategoryId };
  const mockedAttributes = mockedCategory.attributes;
  const mockedBody = { data: { attributes: mockedAttributes } };
  const mockedDb = 'mockedDb';
  const mockedData = { ...mockedCategory };
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const req = {
    method: mockedMethod,
    uid: mockedUid,
    body: mockedBody,
    query: mockedQuery,
    db: mockedDb,
  } as unknown as NextApiRequestWithAuth;
  const res = {
    status: mockedStatus,
  } as unknown as NextApiResponse;

  let mockedUpdate = jest.fn(() => mockedData);
  const mockedDelete = jest.fn();
  const mockedGetInstance = jest.fn(() => ({
    update: mockedUpdate,
    delete: mockedDelete,
  }));

  beforeEach(() => {
    (
      CategoriesService.getInstance as unknown as jest.Mock
    ).mockImplementationOnce(mockedGetInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when method is PATCH', () => {
    test('writes status and data to response', async () => {
      // Arange
      mockedUpdate = jest.fn(() => mockedData);
      // Act
      await handler(req, res);
      // Assert
      expect(mockedGetInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedUpdate).toHaveBeenCalledWith(
        mockedUid,
        mockedGameId,
        mockedCategoryId,
        mockedAttributes
      );
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({ data: mockedData });
    });
  });

  describe('when method is DELETE', () => {
    const mockedMethod = 'DELETE';
    const mockedReq = {
      ...req,
      method: mockedMethod,
    } as unknown as NextApiRequestWithAuth;

    const mockedDeleteItem = jest.fn();
    const mockedGetAllItems = jest.fn(() => mockedItems);
    const mockedGetItemsServiceInstance = jest.fn(() => ({
      getAll: mockedGetAllItems,
      delete: mockedDeleteItem,
    }));

    beforeEach(() => {
      (ItemsService.getInstance as unknown as jest.Mock).mockImplementationOnce(
        mockedGetItemsServiceInstance
      );
    });

    test('writes status to response', async () => {
      // Arange
      mockedUpdate = jest.fn(() => mockedData);
      // Act
      await handler(mockedReq, res);
      // Assert
      expect(mockedGetInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedGetItemsServiceInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedGetAllItems).toHaveBeenCalledWith(
        mockedUid,
        mockedGameId,
        mockedCategoryId,
        'categoryId'
      );
      expect(mockedDeleteItem).toHaveBeenCalledTimes(2);
      expect(mockedDelete).toHaveBeenCalledWith(
        mockedUid,
        mockedGameId,
        mockedCategoryId
      );
      expect(mockedStatus).toHaveBeenCalledWith(204);
      expect(mockedJson).toHaveBeenCalledWith({});
    });
  });

  describe('when get error', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedErrorMessage = 'New Error';
      mockedUpdate = jest.fn(() => {
        throw Error(mockedErrorMessage);
      });

      const expectedError = {
        error: 'expectedError',
      };
      const expectedStatusNumber = 500;

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(req, res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(
        expectedStatusNumber,
        mockedErrorMessage
      );
    });
  });

  describe('when method is not allowed', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedReq = {
        ...req,
        method: 'GET',
      } as unknown as NextApiRequestWithAuth;
      mockedUpdate = jest.fn(() => mockedData);

      const expectedStatusNumber = 405;
      const expectedError = {
        error: 'expectedError',
      };
      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(mockedReq, res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(expectedStatusNumber);
    });
  });
});
