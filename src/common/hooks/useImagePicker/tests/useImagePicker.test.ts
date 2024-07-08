import { renderHook, cleanup, act } from '@testing-library/react';

import { useDropzone } from 'react-dropzone';

import usePasteImage from '@/common/hooks/usePasteImage';

import { getFileWithPreview } from '@/common/utils/files';

import { ImagePickerProps } from '@/common/types/props';

import useImagePicker from '../useImagePicker';

jest.mock('react-dropzone');
jest.mock('@/common/hooks/usePasteImage');
jest.mock('@/common/utils/files');

describe('useImagePicker', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const mockedDefaultUrlValue = 'image-url';
  const mockedOnChange = jest.fn();
  const mockedProps = {
    defaultUrlValue: mockedDefaultUrlValue,
    onChange: mockedOnChange,
  } as unknown as ImagePickerProps;
  const mockedPastedImage = { preview: 'mocked-pasted-image-preview' };
  const mockedPasteImage = jest.fn(() => mockedPastedImage);
  const mockedUsePasteImage = jest.fn(() => ({
    pasteImage: mockedPasteImage,
  }));
  const mockedFileWithPreview = 'mocked-file-with-preview';
  const mockedGetFileWithPreview = jest.fn(() => mockedFileWithPreview);
  const mockedDropzone = 'mocked-dropzone';
  const mockedUseDropzone = jest.fn(() => mockedDropzone);

  beforeEach(() => {
    (usePasteImage as unknown as jest.Mock).mockImplementation(
      mockedUsePasteImage
    );
    (getFileWithPreview as unknown as jest.Mock).mockImplementation(
      mockedGetFileWithPreview
    );
    (useDropzone as unknown as jest.Mock).mockImplementation(mockedUseDropzone);
  });

  test('returns state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useImagePicker(mockedProps));
    // Assert
    expect(mockedUsePasteImage).toHaveBeenCalledWith();
    expect(mockedGetFileWithPreview).not.toHaveBeenCalled();
    expect(mockedUseDropzone).toHaveBeenCalledWith({
      accept: {
        'image/png': [],
        'image/jpeg': [],
        'image/webp': [],
        'image/gif': [],
      },
      maxFiles: 1,
      onDrop: expect.any(Function),
    });
    expect(result.current).toEqual({
      pasteImage: expect.any(Function),
      onClearFile: expect.any(Function),
      previewUrl: mockedDefaultUrlValue,
      dropzone: mockedDropzone,
    });
  });

  describe('When image is pasting', () => {
    test('returns updated state and calls setImageFile', async () => {
      // Arange
      const { result } = renderHook(() => useImagePicker(mockedProps));
      // Act
      await act(async () => {
        await result.current.pasteImage();
      });
      // Assert
      expect(mockedPasteImage).toHaveBeenCalled();
      expect(mockedOnChange).toHaveBeenCalledWith(mockedPastedImage);
      expect(result.current).toEqual({
        pasteImage: expect.any(Function),
        onClearFile: expect.any(Function),
        previewUrl: mockedPastedImage.preview,
        dropzone: mockedDropzone,
      });
    });
  });

  describe('When image is cleared', () => {
    test('returns updated state and calls setImageFile', async () => {
      // Arange
      const { result } = renderHook(() => useImagePicker(mockedProps));
      // Act
      await act(async () => {
        await result.current.onClearFile();
      });
      // Assert
      expect(result.current).toEqual({
        pasteImage: expect.any(Function),
        onClearFile: expect.any(Function),
        previewUrl: '',
        dropzone: mockedDropzone,
      });
      expect(mockedPasteImage).not.toHaveBeenCalled();
      expect(mockedOnChange).toHaveBeenCalledWith(null);
    });
  });
});
