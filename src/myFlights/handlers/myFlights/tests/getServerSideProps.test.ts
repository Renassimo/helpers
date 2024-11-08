import NotionService from '@/common/services/notion';

import getMyFlights from '@/myFlights/handlers/myFlights/getMyFlights';

import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { Firestore } from '@/common/lib/firebase/types';

import getServerSideProps from '../getServerSideProps';

jest.mock('@/common/services/notion', () => jest.fn());
jest.mock('@/myFlights/handlers/myFlights/getMyFlights');
jest.mock('@/common/lib/firebase/auth', jest.fn());

describe('getServerSideProps', () => {
  const mockedDb = 'mockedDb' as unknown as Firestore;
  const dataBaseID = 'data-base-id';
  const mockedToken = 'token';
  const mockedUser = { name: 'User' };
  const mockedData = { properties: {} };
  const mockedPath = '/myFlights';
  const mockedTitle = 'My Flights';
  const mockedPages = [{ path: mockedPath, title: mockedTitle }];
  const mockedContext = {
    user: mockedUser,
    pages: mockedPages,
    notionHelperData: { dataBaseID, token: mockedToken },
    db: mockedDb,
  };
  const nextCursor = 'nextCursor';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when got no errors', () => {
    beforeEach(() => {
      const mockedGetFlights = jest.fn(async () => ({
        data: mockedData,
        error: null,
        nextCursor,
      }));
      (getMyFlights as unknown as jest.Mock).mockImplementationOnce(
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
          nextCursor,
        },
      };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContextWithAuth
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(NotionService).toHaveBeenCalledWith(mockedToken);
      expect(getMyFlights).toHaveBeenCalledWith({
        dataBaseID,
        notionService: expect.any(NotionService),
      });
    });
  });

  describe('when got error', () => {
    test('Returns props with error', async () => {
      // Arrange
      const mockedGetFlights = jest.fn(async () => ({
        data: null,
        error: { status: 500 },
      }));
      (getMyFlights as unknown as jest.Mock).mockImplementationOnce(
        mockedGetFlights
      );
      const expectedResult = {
        props: {
          data: null,
          error: { status: 500 },
          user: mockedUser,
          pages: mockedPages,
          nextCursor: null,
        },
      };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContextWithAuth
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(NotionService).toHaveBeenCalledWith(mockedToken);
      expect(getMyFlights).toHaveBeenCalledWith({
        dataBaseID,
        notionService: expect.any(NotionService),
      });
    });
  });

  describe('when got error with 404 status', () => {
    test('Returns redirect to 404', async () => {
      // Arrange
      const mockedGetFlights = jest.fn(async () => ({
        data: null,
        error: { status: 404 },
      }));
      (getMyFlights as unknown as jest.Mock).mockImplementationOnce(
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
      expect(getMyFlights).toHaveBeenCalledWith({
        dataBaseID,
        notionService: expect.any(NotionService),
      });
    });
  });
});
