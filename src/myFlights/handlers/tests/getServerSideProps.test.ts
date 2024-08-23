import NotionService from '@/common/services/notion';

import getFlights from '@/myFlights/handlers/getFlights';

import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { Firestore } from '@/common/lib/firebase/types';

import getServerSideProps from '../getServerSideProps';

jest.mock('@/common/services/notion', () => jest.fn());
jest.mock('@/myFlights/handlers/getFlights');
jest.mock('@/common/lib/firebase/auth', jest.fn());

describe('getServerSideProps', () => {
  const mockedDb = 'mockedDb' as unknown as Firestore;
  const mockedDataBaseID = 'data-base-id';
  const mockedToken = 'token';
  const mockedUser = { name: 'User' };
  const mockedData = { properties: {} };
  const mockedPath = '/myFlights';
  const mockedTitle = 'My Flights';
  const mockedPages = [{ path: mockedPath, title: mockedTitle }];
  const mockedContext = {
    user: mockedUser,
    pages: mockedPages,
    notionHelperData: { dataBaseID: mockedDataBaseID, token: mockedToken },
    db: mockedDb,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when got no errors', () => {
    beforeEach(() => {
      const mockedGetFlights = jest.fn(async () => ({
        data: mockedData,
        error: null,
      }));
      (getFlights as unknown as jest.Mock).mockImplementationOnce(
        mockedGetFlights
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
      expect(getFlights).toHaveBeenCalledWith({}, mockedDataBaseID);
    });
  });

  describe('when got error', () => {
    test('Returns props with error', async () => {
      // Arrange
      const mockedGetFlights = jest.fn(async () => ({
        data: null,
        error: { status: 500 },
      }));
      (getFlights as unknown as jest.Mock).mockImplementationOnce(
        mockedGetFlights
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
      expect(getFlights).toHaveBeenCalledWith({}, mockedDataBaseID);
    });
  });

  describe('when got error with 404 status', () => {
    test('Returns redirect to 404', async () => {
      // Arrange
      const mockedGetFlights = jest.fn(async () => ({
        data: null,
        error: { status: 404 },
      }));
      (getFlights as unknown as jest.Mock).mockImplementationOnce(
        mockedGetFlights
      );
      const expectedResult = { notFound: true };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContextWithAuth
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(NotionService).toHaveBeenCalledWith(mockedToken);
      expect(getFlights).toHaveBeenCalledWith({}, mockedDataBaseID);
    });
  });
});
