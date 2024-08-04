import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import ImagePaste from '../ImagePaste';

describe('ImagePaste', () => {
  const mockedOnPaste = jest.fn();

  test('renders snapshot successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <ImagePaste onPaste={mockedOnPaste} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when clicked', () => {
    test('call onPaste', async () => {
      // Arange
      const { getByText } = renderWithTheme(
        <ImagePaste onPaste={mockedOnPaste} />
      );
      // Act
      await userEvent.click(getByText('...Or paste from clipboard'));
      // Assert
      expect(mockedOnPaste).toHaveBeenCalled();
    });
  });
});
