import { FileWithPreview } from '@/common/types/files';
import { getFileWithPreview, getPastedFile, updateImageRatio } from '../files';

describe('files utils', () => {
  describe('getFileWithPreview', () => {
    afterEach(() => {
      // @ts-ignore
      delete globalThis.URL;
      jest.clearAllMocks();
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

  describe('updateImageRatio', () => {
    const mockedCallback = jest.fn();

    afterEach(() => {
      // @ts-ignore
      delete globalThis.Image;
      jest.clearAllMocks();
    });

    test('calls callback with ratio', async () => {
      // Arange
      const mockedFile = {
        preview: 'mockedPreview',
      } as unknown as FileWithPreview;
      Object.defineProperty(globalThis, 'Image', {
        value: class {
          width: number;
          height: number;

          constructor() {
            this.width = 2;
            this.height = 1;

            // @ts-ignore
            setTimeout(() => this['onload'](), 0);
          }
        },
      });
      // Act
      updateImageRatio(mockedFile, mockedCallback);
      await new Promise((r) => setTimeout(r, 0));
      // Assert
      expect(mockedCallback).toHaveBeenCalledWith(2);
    });

    describe('when file is null', () => {
      test('calls callback with ratio', () => {
        // Arange
        // Act
        updateImageRatio(null, mockedCallback);
        // Assert
        expect(mockedCallback).toHaveBeenCalledWith(null);
      });
    });
  });
});
