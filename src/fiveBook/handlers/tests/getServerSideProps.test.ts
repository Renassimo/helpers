import { getDayCode } from '@/common/utils/dayjs';

import NotionService from '@/common/services/notion';

import getDay from '@/fiveBook/handlers/getDay';

import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { Firestore } from '@/common/lib/firebase/types';

import getServerSideProps from '../getServerSideProps';

jest.mock('@/common/services/notion', () => jest.fn());
jest.mock('@/common/utils/dayjs', () => ({
  getDayCode: jest.fn(),
}));
jest.mock('@/fiveBook/handlers/getDay');
jest.mock('@/common/lib/firebase/auth', jest.fn());

describe('getServerSideProps', () => {
  const mockedDb = 'mockedDb' as unknown as Firestore;
  const mockedDayCode = '10101';
  const mockedQuery = { dayCode: mockedDayCode };
  const mockedDataBaseID = 'data-base-id';
  const mockedToken = 'token';
  const mockedUser = { name: 'User' };
  const mockedData = { properties: {} };
  const mockedPath = '/5book';
  const mockedTitle = '5book';
  const mockedPages = [{ path: mockedPath, title: mockedTitle }];
  const mockedContext = {
    query: mockedQuery,
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
      const mockedGetDay = jest.fn(async () => ({
        data: mockedData,
        error: null,
      }));
      (getDay as unknown as jest.Mock).mockImplementationOnce(mockedGetDay);
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
      expect(getDayCode).not.toHaveBeenCalled();
      expect(getDay).toHaveBeenCalledWith({}, mockedDataBaseID, mockedDayCode);
    });

    describe('when there is no dayCode', () => {
      test('Returns props with today data', async () => {
        // Arrange
        const mockedTodayCode = '20202';
        const mockedGetDayCode = jest.fn(() => mockedTodayCode);
        (getDayCode as unknown as jest.Mock).mockImplementationOnce(
          mockedGetDayCode
        );

        const expectedResult = {
          props: {
            data: mockedData,
            error: null,
            user: mockedUser,
            pages: mockedPages,
          },
        };
        // Act
        const result = await getServerSideProps({
          ...mockedContext,
          query: {},
        } as unknown as GetServerSidePropsContextWithAuth);
        // Assert
        expect(result).toEqual(expectedResult);
        expect(NotionService).toHaveBeenCalledWith(mockedToken);
        expect(getDayCode).toHaveBeenCalledWith();
        expect(getDay).toHaveBeenCalledWith(
          {},
          mockedDataBaseID,
          mockedTodayCode
        );
      });
    });
  });

  describe('when got error', () => {
    test('Returns props with error', async () => {
      // Arrange
      const mockedGetDay = jest.fn(async () => ({
        data: null,
        error: { status: 500 },
      }));
      (getDay as unknown as jest.Mock).mockImplementationOnce(mockedGetDay);
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
      expect(getDayCode).not.toHaveBeenCalled();
      expect(getDay).toHaveBeenCalledWith({}, mockedDataBaseID, mockedDayCode);
    });
  });

  describe('when got error with 404 status', () => {
    test('Returns redirect to 404', async () => {
      // Arrange
      const mockedGetDay = jest.fn(async () => ({
        data: null,
        error: { status: 404 },
      }));
      (getDay as unknown as jest.Mock).mockImplementationOnce(mockedGetDay);
      const expectedResult = { notFound: true };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContextWithAuth
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(NotionService).toHaveBeenCalledWith(mockedToken);
      expect(getDayCode).not.toHaveBeenCalled();
      expect(getDay).toHaveBeenCalledWith({}, mockedDataBaseID, mockedDayCode);
    });
  });
});
