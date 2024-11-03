import fetchMock from 'fetch-mock';

import { PhotoFolder } from '@/spotting/types';

import createPhotoInfo from '../createPhotoInfo';

describe('createPhotoInfo', () => {
  const url = '/api/photoInfo';
  const mockedResponseData = { hello: 'world' };
  const foldersList = [
    { attributes: 'attributes1' },
    { attributes: 'attributes2' },
  ] as unknown as PhotoFolder[];
  const setLoading = jest.fn();

  beforeEach(() => {
    fetchMock.post(url, mockedResponseData);
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.reset();
  });

  test('calls fetch and setLoading', async () => {
    // Arange
    // Act
    const result = await createPhotoInfo(foldersList, setLoading);
    // Assert
    expect(result).toEqual([
      { status: 'fulfilled', value: mockedResponseData },
      { status: 'fulfilled', value: mockedResponseData },
    ]);
    expect(fetchMock.lastUrl()).toEqual(url);
    expect(fetchMock.lastOptions()).toEqual({
      method: 'POST',
      body: '{"data":{"attributes":"attributes2"}}',
    });
    expect(setLoading).toBeCalledTimes(2);
    expect(setLoading).nthCalledWith(1, true);
    expect(setLoading).nthCalledWith(2, false);
  });
});
