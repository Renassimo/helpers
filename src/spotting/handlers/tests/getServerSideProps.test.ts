import NotionService from '@/services/notion';

import { getSpottedPlanes } from '@/spotting/handlers';

import { GetServerSidePropsContextWithAuth } from '@/types/auth';

import getServerSideProps from '../getServerSideProps';

jest.mock('@/services/notion', () => jest.fn());
jest.mock('@/spotting/handlers/getSpottedPlanes');
jest.mock('@/lib/firebase/auth', jest.fn());
jest.mock('@/lib/firebase/firestore', jest.fn());

describe('getServerSideProps', () => {
  const mockedDataBaseID = 'data-base-id';
  const mockedToken = 'token';
  const mockedUser = { name: 'User' };
  const mockedData = { properties: {} };
  const mockedPath = '/spotting';
  const mockedTitle = 'spotting';
  const mockedPages = [{ path: mockedPath, title: mockedTitle }];
  const mockedContext = {
    user: mockedUser,
    pages: mockedPages,
    notionHelperData: { dataBaseID: mockedDataBaseID, token: mockedToken },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when got no errors', () => {
    beforeEach(() => {
      const mockedGetSpottedPlanes = jest.fn(async () => ({
        data: mockedData,
        error: null,
      }));
      (getSpottedPlanes as unknown as jest.Mock).mockImplementationOnce(
        mockedGetSpottedPlanes
      );
    });

    test('Returns props', async () => {
      // Arrange
      const expectedResult = {
        props: {
          data: mockedData,
          error: null,
          user: mockedUser,
          pages: mockedPages,
        },
      };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContextWithAuth
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(NotionService).toHaveBeenCalledWith(mockedToken);
      expect(getSpottedPlanes).toHaveBeenCalledWith({}, mockedDataBaseID);
    });
  });

  describe('when got error', () => {
    test('Returns props with error', async () => {
      // Arrange
      const mockedGetSpottedPlanes = jest.fn(async () => ({
        data: null,
        error: { status: 500 },
      }));
      (getSpottedPlanes as unknown as jest.Mock).mockImplementationOnce(
        mockedGetSpottedPlanes
      );
      const expectedResult = {
        props: {
          data: null,
          error: { status: 500 },
          user: mockedUser,
          pages: mockedPages,
        },
      };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContextWithAuth
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(NotionService).toHaveBeenCalledWith(mockedToken);
      expect(getSpottedPlanes).toHaveBeenCalledWith({}, mockedDataBaseID);
    });
  });

  describe('when got error with 404 status', () => {
    test('Returns redirect to 404', async () => {
      // Arrange
      const mockedGetSpottedPlanes = jest.fn(async () => ({
        data: null,
        error: { status: 404 },
      }));
      (getSpottedPlanes as unknown as jest.Mock).mockImplementationOnce(
        mockedGetSpottedPlanes
      );
      const expectedResult = { notFound: true };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContextWithAuth
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(NotionService).toHaveBeenCalledWith(mockedToken);
      expect(getSpottedPlanes).toHaveBeenCalledWith({}, mockedDataBaseID);
    });
  });
});
