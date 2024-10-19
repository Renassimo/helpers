import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { useDropzone } from 'react-dropzone';

import ImageDrop from '@/common/components/ImagePicker/components/ImageDrop';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import MockedImageDrop from '@/common/components/ImagePicker/components/ImageDrop/mocks/MockedImageDrop';

import PhotoDropZone from './PhotoDropZone';

jest.mock('react-dropzone');
jest.mock('@/common/components/ImagePicker/components/ImageDrop');
jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');

describe('PhotoDropZone', () => {
  beforeEach(() => {
    (useDropzone as unknown as jest.Mock).mockImplementation(
      jest.fn(() => 'mocked-dropzone')
    );
    (ImageDrop as unknown as jest.Mock).mockImplementation(MockedImageDrop);
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ dispatch: 'mocked-dispatch' }))
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoDropZone />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(useDropzone).toBeCalledWith({ onDrop: expect.any(Function) });
    expect(ImageDrop).toBeCalledWith({ dropzone: 'mocked-dropzone' }, {});
    expect(usePhotoInfoContext).toBeCalledWith();
  });
});
