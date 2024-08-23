import renderWithTheme from '@/common/tests/helpers/renderWithTheme';
import FilterInput from '../FilterInput';
import userEvent from '@testing-library/user-event';

describe('FilterInput', () => {
  const mockedValue = 'value';
  const mockedSetValue = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <FilterInput value={mockedValue} setValue={mockedSetValue} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when fullWidth passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <FilterInput value={mockedValue} setValue={mockedSetValue} fullWidth />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when changes value', () => {
    test('calls mockedSetValue', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <FilterInput value="" setValue={mockedSetValue} />
      );
      // Act
      await userEvent.type(getByLabelText('Filter'), 'T');
      // Assert
      expect(mockedSetValue).toHaveBeenCalledWith('T');
    });
  });

  describe('when changes value', () => {
    test('calls mockedSetValue', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <FilterInput value={mockedValue} setValue={mockedSetValue} />
      );
      // Act
      await userEvent.click(getByLabelText('Clear filter'));
      // Assert
      expect(mockedSetValue).toHaveBeenCalledWith('');
    });
  });
});
