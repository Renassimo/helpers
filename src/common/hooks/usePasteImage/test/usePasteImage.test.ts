import { renderHook, cleanup, act } from '@testing-library/react';

import { getPastedFileWithPreview } from '@/common/utils/files';

import usePasteImage from '../usePasteImage';

jest.mock('@/common/utils/files');

describe('usePasteImage', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('returns image', async () => {
    // Arange
    const mockedImage = 'image';
    let image = null;
    (getPastedFileWithPreview as unknown as jest.Mock).mockImplementationOnce(
      () => mockedImage
    );
    const { result } = renderHook(() => usePasteImage());
    // Act
    await act(async () => {
      image = await result.current.pasteImage();
    });
    // Assert
    expect(image).toEqual(mockedImage);
    expect(result.current.image).toEqual(mockedImage);
    expect(result.current.error).toEqual(null);
  });

  describe('when error happened', () => {
    test('returns error', async () => {
      // Arange
      const mockedError = new Error('Error!');
      (getPastedFileWithPreview as unknown as jest.Mock).mockImplementationOnce(
        () => {
          throw mockedError;
        }
      );
      const { result } = renderHook(() => usePasteImage());
      // Act
      await act(async () => {
        await result.current.pasteImage();
      });
      // Assert
      expect(result.current.image).toEqual(null);
      expect(result.current.error).toEqual(mockedError);
    });
  });
});
