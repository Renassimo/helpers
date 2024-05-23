import { getDayCode } from '@/utils/dayjs';

import NotionService from '@/services/notion';

import { getDay } from '@/fiveBook/handlers';

import { GetServerSidePropsContextWithAuth } from '@/types/auth';

import getServerSideProps from '../getServerSideProps';

jest.mock('@/services/notion', () => jest.fn());
jest.mock('@/utils/dayjs', () => ({
  getDayCode: jest.fn(),
}));
jest.mock('@/fiveBook/handlers/getDay');
jest.mock('@/lib/firebase/auth', jest.fn());
jest.mock('@/lib/firebase/firestore', jest.fn());

describe('getServerSideProps', () => {
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
