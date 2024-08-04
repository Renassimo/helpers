import renderWithTheme from '@/common/tests/helpers/renderWithTheme';
import SaveMarkerPopupContent from '../SaveMarkerPopupContent';
import userEvent from '@testing-library/user-event';

describe('SaveMarkerPopupContent', () => {
  const mockedOnAdd = jest.fn();
  const mockedOnCancel = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('matches snapshot', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <SaveMarkerPopupContent onAdd={mockedOnAdd} onCancel={mockedOnCancel} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when tesxt passed', () => {
    test('matches snapshot', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <SaveMarkerPopupContent
          onAdd={mockedOnAdd}
          onCancel={mockedOnCancel}
          text="mocked-text"
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when onAdd clicked', () => {
    test('matches snapshot', async () => {
      // Arange
      const { getByText } = renderWithTheme(
        <SaveMarkerPopupContent
          onAdd={mockedOnAdd}
          onCancel={mockedOnCancel}
          text="mocked-text"
        />
      );
      // Act
      await userEvent.click(getByText('Yes'));
      // Assert
      expect(mockedOnAdd).toHaveBeenCalledTimes(1);
      expect(mockedOnCancel).not.toHaveBeenCalled();
    });
  });

  describe('when onCancel clicked', () => {
    test('matches snapshot', async () => {
      // Arange
      const { getByText } = renderWithTheme(
        <SaveMarkerPopupContent
          onAdd={mockedOnAdd}
          onCancel={mockedOnCancel}
          text="mocked-text"
        />
      );
      // Act
      await userEvent.click(getByText('No'));
      // Assert
      expect(mockedOnAdd).not.toHaveBeenCalled();
      expect(mockedOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
