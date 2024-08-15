import ItemsService from '@/gameMaps/services/items';
import PlaysService from '@/gameMaps/services/plays';
import { getError } from '@/common/utils/errors';

import {
  mockedGame,
  mockedItem,
  mockedItem1,
  mockedPlay,
} from '@/gameMaps/types/mocks';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import handler from '../../api/updateDelete';

jest.mock('@/gameMaps/services/items');
jest.mock('@/gameMaps/services/plays');
jest.mock('@/common/utils/errors');

describe('updateDelete (item)', () => {
  const mockedMethod = 'PATCH';
  const mockedUid = 'uid';
  const mockedGameId = mockedGame.id;
  const mockedItemId = mockedItem.id;
  const mockedPlayId = mockedPlay.id;
  const mockedQuery = { gameId: mockedGameId, itemId: mockedItemId };
  const mockedAttributes = mockedItem.attributes;
  const mockedBody = { data: { attributes: mockedAttributes } };
  const mockedDb = 'mockedDb';
  const mockedData = { ...mockedItem };
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
  let mockedGetOne = jest.fn(() => mockedItem);
  const mockedGetItemsServiceInstance = jest.fn(() => ({
    update: mockedUpdate,
    delete: mockedDelete,
    getOne: mockedGetOne,
  }));

  let mockedUpdateDate = jest.fn(() => ({}));
  const mockedGetPlaysInstance = jest.fn(() => ({
    updateDate: mockedUpdateDate,
  }));

  beforeEach(() => {
    (ItemsService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetItemsServiceInstance
    );
    (PlaysService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetPlaysInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when method is PATCH', () => {
    test('writes status and data to response and updates play', async () => {
      // Arange
      mockedGetOne = jest.fn(() => mockedItem);
      mockedUpdate = jest.fn(() => mockedData);
      mockedUpdateDate = jest.fn(() => ({}));
      const req = {
        method: mockedMethod,
        uid: mockedUid,
        body: {
          data: {
            attributes: { ...mockedItem1.attributes },
          },
        },
        query: mockedQuery,
        db: mockedDb,
      } as unknown as NextApiRequestWithAuth;
      // Act
      await handler(req, res);
      // Assert
      expect(mockedGetItemsServiceInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedGetOne).not.toHaveBeenCalled();
      expect(mockedUpdate).toHaveBeenCalledWith(
        mockedUid,
        mockedGameId,
        mockedItemId,
        { ...mockedItem1.attributes }
      );
      expect(mockedUpdateDate).toHaveBeenCalledWith(
        mockedUid,
        mockedGameId,
        mockedPlayId
      );
      expect(mockedUpdateDate).toHaveBeenCalledTimes(1);
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

    test('writes status to response and updates play', async () => {
      // Arange
      // Act
      await handler(mockedReq, res);
      // Assert
      expect(mockedGetItemsServiceInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedDelete).toHaveBeenCalledWith(
        mockedUid,
        mockedGameId,
        mockedItemId
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
