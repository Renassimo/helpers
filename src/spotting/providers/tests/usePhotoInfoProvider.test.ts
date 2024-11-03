import { renderHook, waitFor } from '@testing-library/react';
import ExifReader from 'exifreader';

import { defaultPhotosState, PhotoActionType } from '@/spotting/types';

import compressImage from '@/common/utils/images/compressImage';
import { getFileWithPreview } from '@/common/utils/files';

import useAviaOptions from '@/avia/hooks/useAviaOptions';
import useAviaMatchers from '@/avia/hooks/useAviaMatchers';

import usePhotoInfoReducer from '../hooks/usePhotoInfoReducer';

import usePhotoInfoProvider from '../hooks/usePhotoInfoProvider';

jest.mock('@/avia/hooks/useAviaOptions');
jest.mock('@/avia/hooks/useAviaMatchers');
jest.mock('../hooks/usePhotoInfoReducer');
jest.mock('@/common/utils/images/compressImage');
jest.mock('@/common/utils/files');
jest.mock('exifreader');

describe('usePhotoInfoProvider', () => {
  const dispatch = jest.fn();
  const updateMatchers = jest.fn();

  beforeEach(() => {
    (useAviaOptions as unknown as jest.Mock).mockReturnValue({
      data: 'aviaOptions',
    });
    (useAviaMatchers as unknown as jest.Mock).mockReturnValue({
      data: 'aviaMatchers',
      updateMatchers,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns default state', () => {
    // Arange
    (usePhotoInfoReducer as unknown as jest.Mock).mockImplementation(
      jest.fn(() => [defaultPhotosState, dispatch])
    );
    // Act
    const { result } = renderHook(() => usePhotoInfoProvider());
    // Assert
    expect(result.current).toEqual({
      ...defaultPhotosState,
      handlingText: '',
      dispatch,
      photosList: [],
      foldersList: [],
      matchers: 'aviaMatchers',
      options: 'aviaOptions',
      updateMatchers: expect.any(Function),
    });
  });

  describe('when files passed', () => {
    const file1 = { path: '/root/FINAL/path1', type: 'type1', name: 'name1' };
    const file2 = {
      path: '/root/FINAL/path2',
      type: 'image/jpeg',
      name: 'name2',
    };
    const file3 = {
      path: '/root/FINAL/path3',
      type: 'image/jpeg',
      name: 'name3',
    };
    const file4 = { path: '/root/path4', type: 'image/jpeg', name: 'name4' };
    const file5 = {
      path: '/root/FINAL/path5',
      type: 'image/jpeg',
      name: 'name5',
    };
    const files = [file1, file2, file3, file4, file5];

    const photos = { '/root/FINAL/path2': 'photo2' };
    const folder1 = {
      photos: { '/root/FINAL/path3': { path: '/root/FINAL/path3' } },
    };
    const folders = { folder1 };

    beforeEach(() => {
      (usePhotoInfoReducer as unknown as jest.Mock).mockImplementation(
        jest.fn(() => [
          { ...defaultPhotosState, files, photos, folders },
          dispatch,
        ])
      );
      (compressImage as unknown as jest.Mock).mockImplementation(
        jest.fn(() => 'compressed-image')
      );
      (getFileWithPreview as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ preview: 'preview' }))
      );
      (ExifReader.load as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          DateTimeOriginal: { description: '2024:10:19 15:19' },
          GPSLatitude: { description: 10 },
          GPSLongitude: { description: 20 },
        }))
      );
    });

    test('returns updated state', () => {
      // Arange
      // Act
      const { result } = renderHook(() => usePhotoInfoProvider());
      // Assert
      expect(result.current).toEqual({
        ...defaultPhotosState,
        files,
        handlingText: 'Handling: 5 of 5',
        folders,
        photos,
        dispatch,
        photosList: ['photo2'],
        foldersList: [folder1],
        matchers: 'aviaMatchers',
        options: 'aviaOptions',
        updateMatchers: expect.any(Function),
      });
      expect(compressImage).toBeCalledWith(file5, { quality: 0.2 });
      expect(getFileWithPreview).not.toBeCalled();
      expect(dispatch).not.toBeCalled();
    });

    describe('when compressImage resolved', () => {
      test('returns updated state', async () => {
        // Arange
        // Act
        const { result } = renderHook(() => usePhotoInfoProvider());
        // Assert
        await waitFor(() => {
          expect(result.current).toEqual({
            ...defaultPhotosState,
            files,
            handlingText: '',
            folders,
            photos,
            dispatch,
            photosList: ['photo2'],
            foldersList: [folder1],
            matchers: 'aviaMatchers',
            options: 'aviaOptions',
            updateMatchers: expect.any(Function),
          });
          expect(getFileWithPreview).toBeCalledWith('compressed-image');
          expect(dispatch).toBeCalledWith({
            type: PhotoActionType.ADD_PHOTO,
            payload: {
              file: file5,
              path: file5.path,
              name: file5.name,
              selected: false,
              preview: 'preview',
              date: '2024-10-19',
              location: { lat: 10, lon: 20 },
            },
          });
        });
      });
    });
  });
});
