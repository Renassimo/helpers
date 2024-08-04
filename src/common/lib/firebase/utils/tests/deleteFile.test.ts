import deleteFile from '../deleteFile';

import { getStorage, ref, deleteObject } from 'firebase/storage';

jest.mock('firebase/storage');

describe('deleteFile', () => {
  const mockedId = 'mocked-file-id';

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockedStorage = 'mocked-storage';
  const mockedGetStorage = jest.fn(() => mockedStorage);
  const mockedRefResult = 'mocked-ref';
  const mockedRef = jest.fn(() => mockedRefResult);
  const mockedDeleteObject = jest.fn();

  beforeEach(() => {
    (getStorage as unknown as jest.Mock).mockImplementation(mockedGetStorage);
    (ref as unknown as jest.Mock).mockImplementation(mockedRef);
    (deleteObject as unknown as jest.Mock).mockImplementation(
      mockedDeleteObject
    );
  });

  test('deletes file from storage', async () => {
    // Arange
    // Act
    await deleteFile(mockedId);
    // Assert
    expect(mockedGetStorage).toHaveBeenCalledWith();
    expect(mockedRef).toHaveBeenCalledWith(mockedStorage, mockedId);
    expect(mockedDeleteObject).toHaveBeenCalledWith(mockedRefResult);
  });

  describe('when id was not provided', () => {
    test('throws error', async () => {
      // Arange
      // Act
      await deleteFile('');
      // Assert
      expect(mockedGetStorage).not.toHaveBeenCalled();
      expect(mockedRef).not.toHaveBeenCalled();
      expect(mockedDeleteObject).not.toHaveBeenCalled();
    });
  });
});
