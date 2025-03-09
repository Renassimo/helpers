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
  const setProgressText = jest.fn();

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockedResponseData),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls fetch and setLoading', async () => {
    // Arrange
    // Act
    const result = await createPhotoInfo(
      foldersList,
      setLoading,
      setProgressText
    );
    // Assert
    expect(result).toEqual([
      { ok: true, value: mockedResponseData },
      { ok: true, value: mockedResponseData },
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: '{"data":{"attributes":"attributes1"}}',
    });
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: '{"data":{"attributes":"attributes2"}}',
    });
    expect(setLoading).toBeCalledTimes(2);
    expect(setLoading).nthCalledWith(1, true);
    expect(setLoading).nthCalledWith(2, false);
  });
});
