import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { DropzoneState } from 'react-dropzone';

import ImageDrop from '../ImageDrop';

describe('ImageDrop', () => {
  const mockedGetRootProps = jest.fn(() => ({
    className: 'mockedGetRootPropsResult',
  }));
  const mockedGetInputProps = jest.fn(() => ({ type: 'input' }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders snapshot successfully', () => {
    // Act
    const mockedDropzone = {
      getRootProps: mockedGetRootProps,
      getInputProps: mockedGetInputProps,
      isDragAccept: true,
    } as unknown as DropzoneState;
    // Arange
    const { baseElement } = renderWithTheme(
      <ImageDrop dropzone={mockedDropzone} />
    );
    // Assert
    expect(mockedGetRootProps).toHaveBeenCalledWith({
      style: {
        padding: '32px',
        backgroundColor: 'blue',
        border: '1px dashed gray',
        color: 'gray',
        borderRadius: '4px',
      },
    });
    expect(mockedGetInputProps).toHaveBeenCalledWith();
    expect(baseElement).toMatchSnapshot();
  });

  describe('when drag is not accepted', () => {
    test('renders successfully', () => {
      // Act
      const mockedDropzone = {
        getRootProps: mockedGetRootProps,
        getInputProps: mockedGetInputProps,
        isDragAccept: false,
      } as unknown as DropzoneState;
      // Arange
      const {} = renderWithTheme(<ImageDrop dropzone={mockedDropzone} />);
      // Assert
      expect(mockedGetRootProps).toHaveBeenCalledWith({
        style: {
          padding: '32px',
          backgroundColor: '#fafafa',
          border: '1px dashed gray',
          color: 'gray',
          borderRadius: '4px',
        },
      });
      expect(mockedGetInputProps).toHaveBeenCalledWith();
    });
  });
});
