import { getServerSideProps } from '@/handlers/fiveBook/getServerSideProps';
import { GetServerSidePropsContext } from 'next';

import getServerSideUserData from '@/utils/serverSideUserData';
import { getDayCode } from '@/utils/dayjs';

import NotionService from '@/services/notion';

import getDay from '@/handlers/fiveBook/get';

jest.mock('@/utils/serverSideUserData');
jest.mock('@/services/notion', () => jest.fn());
jest.mock('@/utils/dayjs', () => ({
  getDayCode: jest.fn(),
}));
jest.mock('@/handlers/fiveBook/get');
jest.mock('@/lib/firebase/auth', jest.fn());
jest.mock('@/lib/firebase/firestore', jest.fn());

describe('getServerSideProps', () => {
  const mockedDayCode = '10101';
  const mockedQuery = { dayCode: mockedDayCode };
  const mockedContext = { query: mockedQuery };
  const mockedDataBaseID = 'data-base-id';
  const mockedToken = 'token';
  const mockedUser = { name: 'User' };
  const mockedData = { properties: {} };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when got user and notionData', () => {
    beforeEach(() => {
      const mockedGetServerSideUserData = jest.fn(() => ({
        user: mockedUser,
        notionData: {
          fiveBook: { dataBaseID: mockedDataBaseID, token: mockedToken },
        },
      }));
      (getServerSideUserData as unknown as jest.Mock).mockImplementationOnce(
        mockedGetServerSideUserData
      );
    });

    describe('and got no errors', () => {
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
          },
        };
        // Act
        const result = await getServerSideProps(
          mockedContext as unknown as GetServerSidePropsContext
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
        expect(NotionService).toHaveBeenCalledWith(mockedToken);
        expect(getDayCode).not.toHaveBeenCalled();
        expect(getDay).toHaveBeenCalledWith(
          {},
          mockedDataBaseID,
          mockedDayCode
        );
      });

      describe('when is no dayCode', () => {
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
            },
          };
          // Act
          const result = await getServerSideProps({
            query: {},
          } as unknown as GetServerSidePropsContext);
          // Assert
          expect(result).toEqual(expectedResult);
          expect(getServerSideUserData).toHaveBeenCalledWith({ query: {} });
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
      test('Returns redirect to 404', async () => {
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
          },
        };
        // Act
        const result = await getServerSideProps(
          mockedContext as unknown as GetServerSidePropsContext
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
        expect(NotionService).toHaveBeenCalledWith(mockedToken);
        expect(getDayCode).not.toHaveBeenCalled();
        expect(getDay).toHaveBeenCalledWith(
          {},
          mockedDataBaseID,
          mockedDayCode
        );
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
          mockedContext as unknown as GetServerSidePropsContext
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
        expect(NotionService).toHaveBeenCalledWith(mockedToken);
        expect(getDayCode).not.toHaveBeenCalled();
        expect(getDay).toHaveBeenCalledWith(
          {},
          mockedDataBaseID,
          mockedDayCode
        );
      });
    });
  });

  describe('when got no user', () => {
    test('Returns redirect to sign in', async () => {
      // Arrange
      const mockedGetServerSideUserData = jest.fn(() => ({
        user: null,
        notionData: null,
      }));
      (getServerSideUserData as unknown as jest.Mock).mockImplementationOnce(
        mockedGetServerSideUserData
      );
      const expectedResult = {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContext
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
      expect(NotionService).not.toHaveBeenCalled();
      expect(getDayCode).not.toHaveBeenCalled();
      expect(getDay).not.toHaveBeenCalled();
    });
  });

  describe('when got no database id', () => {
    test('Returns redirect to 404', async () => {
      // Arrange
      const mockedGetServerSideUserData = jest.fn(() => ({
        user: mockedUser,
        notionData: { fiveBook: { token: mockedToken } },
      }));
      (getServerSideUserData as unknown as jest.Mock).mockImplementationOnce(
        mockedGetServerSideUserData
      );
      const expectedResult = { notFound: true };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContext
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
      expect(NotionService).not.toHaveBeenCalled();
      expect(getDayCode).not.toHaveBeenCalled();
      expect(getDay).not.toHaveBeenCalled();
    });
  });

  describe('when got no token', () => {
    test('Returns redirect to 404', async () => {
      // Arrange
      const mockedGetServerSideUserData = jest.fn(() => ({
        user: mockedUser,
        notionData: {
          fiveBook: {
            dataBaseID: mockedDataBaseID,
          },
        },
      }));
      (getServerSideUserData as unknown as jest.Mock).mockImplementationOnce(
        mockedGetServerSideUserData
      );
      const expectedResult = { notFound: true };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContext
      );
      // Assert
      expect(result).toEqual(expectedResult);
      expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
      expect(NotionService).not.toHaveBeenCalled();
      expect(getDayCode).not.toHaveBeenCalled();
      expect(getDay).not.toHaveBeenCalled();
    });
  });
});
