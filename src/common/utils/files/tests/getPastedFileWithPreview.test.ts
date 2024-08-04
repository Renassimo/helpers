import { getPastedFileWithPreview } from '../getPastedFileWithPreview';

import { FileWithPreview } from '@/common/types/files';

import { getFileWithPreview, getPastedFile } from '../files';

jest.mock('../files');

describe('getPastedFileWithPreview', () => {
  test('returns pasted file with preview', async () => {
    // Arange
    const mockedPreview = 'preview url';
    const mockedFile = { name: 'file' } as File;
    const mockedFileWithPreview = { preview: mockedPreview } as FileWithPreview;
    const mockedGetPastedFile = jest.fn(() => mockedFile);
    const mockedGetFileWithPreview = jest.fn(async () => mockedFileWithPreview);
    (getPastedFile as unknown as jest.Mock).mockImplementationOnce(
      mockedGetPastedFile
    );
    (getFileWithPreview as unknown as jest.Mock).mockImplementationOnce(
      mockedGetFileWithPreview
    );
    // Act
    const fileWithPreview = await getPastedFileWithPreview();
    // Assert
    expect(mockedGetPastedFile).toHaveBeenCalledWith();
    expect(mockedGetFileWithPreview).toHaveBeenCalledWith(mockedFile);
    expect(fileWithPreview).toEqual(mockedFileWithPreview);
  });
});
