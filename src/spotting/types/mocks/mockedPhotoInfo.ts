import { FileWithPath } from 'react-dropzone';
import { PhotoInfo } from '../photoInfoTypes';

export const mockedPhoto1: PhotoInfo = {
  file: 'file1' as unknown as FileWithPath,
  path: 'path1',
  name: 'name1',
  preview: 'preview1',
  selected: true,
};

export const mockedPhoto2: PhotoInfo = {
  file: 'file2' as unknown as FileWithPath,
  path: 'path2',
  name: 'name2',
  preview: 'preview2',
  selected: true,
};

export const mockedPhoto3: PhotoInfo = {
  file: 'file3' as unknown as FileWithPath,
  path: 'path3',
  name: 'name3',
  preview: 'preview3',
  selected: true,
};

export const mockedPhoto = mockedPhoto1;

export const mockedPhotosState = {
  [mockedPhoto1.path]: mockedPhoto1,
  [mockedPhoto2.path]: mockedPhoto2,
  [mockedPhoto3.path]: mockedPhoto3,
};

export const mockedPhotosList = [mockedPhoto1, mockedPhoto2, mockedPhoto3];

export const mockedPhotoFolder1 = {
  photos: {
    [mockedPhoto1.path]: mockedPhoto1,
    [mockedPhoto2.path]: mockedPhoto2,
  },
  id: 'id1',
};

export const mockedPhotoFolder2 = {
  photos: {
    [mockedPhoto3.path]: mockedPhoto3,
  },
  id: 'id2',
};

export const mockedPhotoFolder = mockedPhotoFolder1;

export const mockedPhotoFoldersState = {
  [mockedPhotoFolder1.id]: mockedPhotoFolder1,
  [mockedPhotoFolder2.id]: mockedPhotoFolder2,
};

export const mockedPhotoFoldersList = [mockedPhotoFolder1, mockedPhotoFolder2];
