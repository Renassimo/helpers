import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import ImagePreview from '../ImagePreview';

describe('ImagePreview', () => {
  const mockedPreviewUrl = 'url';
  const mockedOnClear = jest.fn();

  test('renders snapshot successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <ImagePreview previewUrl={mockedPreviewUrl} onClear={mockedOnClear} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when clear button clicked', () => {
    test('call onClear', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <ImagePreview previewUrl={mockedPreviewUrl} onClear={mockedOnClear} />
      );
      // Act
      await userEvent.click(getByLabelText('clear'));
      // Assert
      expect(mockedOnClear).toHaveBeenCalled();
    });
  });
});
