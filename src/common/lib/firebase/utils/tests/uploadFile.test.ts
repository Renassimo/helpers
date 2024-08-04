import { v4 as uuidv4 } from 'uuid';
import uploadFile from '../uploadFile';

import { getStorage, ref, uploadBytes } from 'firebase/storage';

jest.mock('firebase/storage');
jest.mock('uuid');

describe('uploadFile', () => {
  const mockedName = 'mocked-name';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('uploads file to storage', async () => {
    // Arange
    const expectedName = 'mocked-expected-name';
    const mockedFile = { name: 'mocked-file' } as File;
    const mockedUid = 'mocked-uid';
    const mockedUuidv4 = jest.fn(() => mockedUid);
    const mockedStorage = 'mocked-storage';
    const mockedGetStorage = jest.fn(() => mockedStorage);
    const mockedRefResult = 'mocked-ref';
    const mockedRef = jest.fn(() => mockedRefResult);
    const mockedSnapshot = {
      ref: {
        name: expectedName,
      },
    };
    const mockedUploadBytes = jest.fn(() => mockedSnapshot);
    (uuidv4 as unknown as jest.Mock).mockImplementation(mockedUuidv4);
    (getStorage as unknown as jest.Mock).mockImplementation(mockedGetStorage);
    (ref as unknown as jest.Mock).mockImplementation(mockedRef);
    (uploadBytes as unknown as jest.Mock).mockImplementation(mockedUploadBytes);
    // Act
    const result = await uploadFile(mockedFile, mockedName);
    // Assert
    expect(result).toEqual(expectedName);
    expect(mockedUuidv4).toHaveBeenCalledWith();
    expect(mockedGetStorage).toHaveBeenCalledWith();
    expect(mockedRef).toHaveBeenCalledWith(
      mockedStorage,
      `${mockedName}-${mockedUid}`
    );
    expect(mockedUploadBytes).toHaveBeenCalledWith(mockedRefResult, mockedFile);
  });

  describe('when file was not provided', () => {
    test('throws error', async () => {
      // Arange
      // Act
      // Assert
      expect(async () => {
        await uploadFile(null, mockedName);
      }).rejects.toThrowError('File was not provided');
    });
  });
});
