import { getFileWithPreview, getPastedFile } from '../files';

describe('files utils', () => {
  describe('getFileWithPreview', () => {
    afterEach(() => {
      // @ts-ignore
      delete globalThis.URL;
    });

    test('returns file with preview', () => {
      // Arange
      const mockedFile = {} as File;
      const mockedPreview = 'preview url';
      const expectedFile = { preview: mockedPreview };
      Object.defineProperty(globalThis, 'URL', {
        value: {
          createObjectURL: jest.fn(() => mockedPreview),
        },
      });
      // Act
      const file = getFileWithPreview(mockedFile);
      // Assert
      expect(file).toEqual(expectedFile);
    });
  });

  describe('getPastedFile', () => {
    afterEach(() => {
      // @ts-ignore
      delete globalThis.navigator;
    });

    test('returns pasted file', async () => {
      // Arange
      const mockedBlob = new Blob();
      const mockedGetType = jest.fn(async () => mockedBlob);
      const expectedFile = new File([mockedBlob], 'file');
      const expectedFormat = 'image/png';
      const expectedName = 'image';
      Object.defineProperty(globalThis, 'navigator', {
        value: {
          clipboard: {
            read: async () => [{ getType: mockedGetType }],
          },
        },
      });
      // Act
      const file = await getPastedFile();
      // Assert
      expect(mockedGetType).toHaveBeenCalledWith(expectedFormat);
      expect(file).toEqual(expectedFile);
      expect(file.name).toEqual(expectedName);
    });

    describe('when props passed', () => {
      test('returns pasted file', async () => {
        const mockedBlob = new Blob();
        const mockedGetType = jest.fn(async () => mockedBlob);
        const expectedFile = new File([mockedBlob], 'file');
        const expectedFormat = 'image/png';
        const expectedName = 'image';
        Object.defineProperty(globalThis, 'navigator', {
          value: {
            clipboard: {
              read: async () => [{ getType: mockedGetType }],
            },
          },
        });
        // Act
        const file = await getPastedFile({
          format: expectedFormat,
          name: expectedName,
        });
        // Assert
        expect(mockedGetType).toHaveBeenCalledWith(expectedFormat);
        expect(file).toEqual(expectedFile);
        expect(file.name).toEqual(expectedName);
      });
    });
  });
});
