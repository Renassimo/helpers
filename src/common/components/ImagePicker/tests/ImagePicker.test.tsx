import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import ImageDrop from '../components/ImageDrop';
import ImagePaste from '../components/ImagePaste';
import ImagePreview from '../components/ImagePreview';

import useImagePicker from '@/common/hooks/useImagePicker';

import MockedImageDrop from '../components/ImageDrop/mocks';
import MockedImagePaste from '../components/ImagePaste/mocks';
import MockedImagePreview from '../components/ImagePreview/mocks';

import { ImagePickerProps } from '@/common/types/props';

import ImagePicker from '../ImagePicker';

jest.mock('../components/ImagePreview');
jest.mock('../components/ImageDrop');
jest.mock('../components/ImagePaste');
jest.mock('@/common/hooks/useImagePicker');

describe('ImagePicker', () => {
  const mockedPasteImage = jest.fn();
  const mockedOnClearFile = jest.fn();
  const mockedPreviewUrl = 'mockedPreviewUrl';
  const mockedDropzone = 'mockedDropzone';

  beforeEach(() => {
    (ImageDrop as unknown as jest.Mock).mockImplementation(MockedImageDrop);
    (ImagePaste as unknown as jest.Mock).mockImplementation(MockedImagePaste);
    (ImagePreview as unknown as jest.Mock).mockImplementation(
      MockedImagePreview
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders snapshot successfully', () => {
    // Arange
    const mockedUseImagePicker = jest.fn(() => ({
      pasteImage: mockedPasteImage,
      onClearFile: mockedOnClearFile,
      previewUrl: mockedPreviewUrl,
      dropzone: mockedDropzone,
    }));
    (useImagePicker as unknown as jest.Mock).mockImplementation(
      mockedUseImagePicker
    );
    const mockedDefaultUrlValue = 'mockedDefaultUrlValue';
    const mockedOnChange = jest.fn();
    const mockedProps: ImagePickerProps = {
      defaultUrlValue: mockedDefaultUrlValue,
      onChange: mockedOnChange,
    };
    // Act
    const { baseElement } = renderWithTheme(<ImagePicker {...mockedProps} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(MockedImagePreview).toHaveBeenCalledWith(
      { previewUrl: mockedPreviewUrl, onClear: mockedOnClearFile },
      {}
    );
    expect(MockedImageDrop).not.toHaveBeenCalled();
    expect(MockedImagePaste).not.toHaveBeenCalled();
  });

  describe('when there is no previewUrl', () => {
    test('renders snapshot successfully', () => {
      // Arange
      const mockedUseImagePicker = jest.fn(() => ({
        pasteImage: mockedPasteImage,
        onClearFile: mockedOnClearFile,
        previewUrl: null,
        dropzone: mockedDropzone,
      }));
      (useImagePicker as unknown as jest.Mock).mockImplementation(
        mockedUseImagePicker
      );
      const mockedOnChange = jest.fn();
      const mockedProps: ImagePickerProps = {
        onChange: mockedOnChange,
      };
      // Act
      const { baseElement } = renderWithTheme(<ImagePicker {...mockedProps} />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedImagePreview).not.toHaveBeenCalled();
      expect(MockedImageDrop).toHaveBeenCalledWith(
        { dropzone: mockedDropzone },
        {}
      );
      expect(MockedImagePaste).toHaveBeenCalledWith(
        { onPaste: mockedPasteImage },
        {}
      );
    });
  });
});
