import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

import usePhotoInfoSaver from '@/spotting/hooks/usePhotoInfoSaver';

import PhotoFolderSaver from '../PhotoFolderSaver';

jest.mock('@/spotting/hooks/usePhotoInfoSaver');

describe('PhotoFolderSaver', () => {
  const onSave = jest.fn();

  beforeEach(() => {
    (usePhotoInfoSaver as jest.Mock).mockReturnValue({
      loading: false,
      onSave,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    // Arange
    // Act
    const { baseElement } = render(<PhotoFolderSaver />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when loading', () => {
    const progressText = 'progressText';

    beforeEach(() => {
      (usePhotoInfoSaver as jest.Mock).mockReturnValue({
        loading: true,
        onSave,
        progressText,
      });
    });

    test('renders correctly', () => {
      // Arange
      const { baseElement } = render(<PhotoFolderSaver />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when clicks "Save button"', () => {
    test('calls onSave', async () => {
      // Arange
      const { getByText } = render(<PhotoFolderSaver />);
      // Act
      await userEvent.click(getByText('Save'));
      // Assert
      expect(onSave).toBeCalled();
    });
  });
});
