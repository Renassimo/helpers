import { GetStaticPropsContext } from 'next';

import { getDataForApi } from '@/utils/motivationPoll/dataHandler';

import getStaticProps from '../getStaticProps';

jest.mock('@/utils/motivationPoll/dataHandler');

describe('getStaticProps', () => {
  const mockedGetDataForApi = jest.fn(() => 'mockedData');

  beforeEach(() => {
    (getDataForApi as jest.Mock).mockImplementation(mockedGetDataForApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns default locale data', async () => {
    // Arange
    const expectedResult = {
      props: { data: 'mockedData', locales: ['ru', 'en', 'tt'], locale: 'en' },
    };
    const mockedCtx: GetStaticPropsContext = {
      defaultLocale: 'en',
      locales: ['ru', 'en', 'tt'],
    };
    // Act
    const result = await getStaticProps(mockedCtx);
    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockedGetDataForApi).toBeCalledWith('en');
  });

  describe('when locale specified', () => {
    test('returns specified locale data', async () => {
      // Arange
      const expectedResult = {
        props: {
          data: 'mockedData',
          locales: ['ru', 'en', 'tt'],
          locale: 'ru',
        },
      };
      const mockedCtx: GetStaticPropsContext = {
        locale: 'ru',
        defaultLocale: 'en',
        locales: ['ru', 'en', 'tt'],
      };
      // Act
      const result = await getStaticProps(mockedCtx);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedGetDataForApi).toBeCalledWith('ru');
    });
  });

  describe('when specified locale is wrong', () => {
    test('returns default locale data', async () => {
      // Arange
      const expectedResult = {
        props: {
          data: 'mockedData',
          locales: ['ru', 'en', 'tt'],
          locale: 'en',
        },
      };
      const mockedCtx: GetStaticPropsContext = {
        locale: 'ua',
        defaultLocale: 'en',
        locales: ['ru', 'en', 'tt'],
      };
      // Act
      const result = await getStaticProps(mockedCtx);
      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockedGetDataForApi).toBeCalledWith('en');
    });
  });
});
