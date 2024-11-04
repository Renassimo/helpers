import JSZip from 'jszip';

import { FileWithPath } from 'react-dropzone';
import { PhotoFolder, PhotoInfo } from '@/spotting/types';

import downloadZip from '@/common/utils/files/downloadZip';

import zipPhotoFolders from '../zipPhotoFolders';

jest.mock('jszip');
jest.mock('@/common/utils/files/downloadZip');

describe('zipPhotoFolders', () => {
  const file = jest.fn();
  const file1 = { name: 'photo1.jpg' };
  const file2 = { name: 'photo2.jpg' };
  const file3 = { name: 'photo3.jpg' };
  const file4 = { name: 'photo4.jpg' };
  const file5 = { name: 'photo1.jpeg' };
  const file6 = { name: 'photo1.cr2' };
  const file7 = { name: 'photo5.jpg' };
  const file8 = { name: 'photo5.cr2' };
  const file9 = { name: 'photo5.jpeg' };
  const foldersList = [
    {
      photos: {
        '/ROOT/photo1': { name: 'photo1.jpg', file: file1 },
        '/photo2': { name: 'photo2.jpg', file: file2 },
      },
      attributes: { title: 'FOLDER 1' },
    },
    {
      photos: {
        '/photo3': { name: 'photo3.jpg', file: file3 },
      },
    },
  ];
  const photosList = [{ name: 'photo5.jpeg', file: file9 }];
  const files = [file1, file2, file3, file4, file5, file6, file7, file8, file9];

  beforeEach(() => {
    (JSZip as unknown as jest.Mock).mockImplementation(() => ({
      file,
    }));
    (downloadZip as unknown as jest.Mock).mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates zip file', () => {
    // Arange
    // Act
    zipPhotoFolders(
      foldersList as unknown as PhotoFolder[],
      photosList as unknown as PhotoInfo[],
      files as unknown as FileWithPath[]
    );
    // Assert
    expect(JSZip).toBeCalledTimes(1);
    expect(file).toBeCalledTimes(8);
    expect(file).nthCalledWith(1, 'FOLDER 1/FINAL/photo1.jpg', file1);
    expect(file).nthCalledWith(2, 'FOLDER 1/photo1.jpeg', file5);
    expect(file).nthCalledWith(3, 'FOLDER 1/photo1.cr2', file6);
    expect(file).nthCalledWith(4, 'FOLDER 1/FINAL/photo2.jpg', file2);
    expect(file).nthCalledWith(5, 'Folder 2/FINAL/photo3.jpg', file3);
    expect(file).nthCalledWith(6, 'FINAL/photo5.jpeg', file9);
    expect(file).nthCalledWith(7, 'photo5.jpg', file7);
    expect(file).nthCalledWith(8, 'photo5.cr2', file8);
    expect(downloadZip).toBeCalledWith(expect.any(Object), 'ROOT');
  });
});
