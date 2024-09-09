import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import ClearableInput from '../ClearableInput';

describe('ClearableInput', () => {
  const setValue = jest.fn();
  const props = {
    setValue,
    value: 'value',
    fullWidth: true,
    // disabled: false,
    // originalValue: 'original value',
    inputProps: {
      'aria-label': 'Input',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<ClearableInput {...props} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when value is empty', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <ClearableInput {...props} value={null} label="Input label" />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when type is url', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <ClearableInput {...props} type="url" placeholder="Placeholder" />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when types', () => {
    test('calls setValue', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(<ClearableInput {...props} />);
      // Act
      await userEvent.type(getByLabelText('Input'), '1');
      // Assert
      expect(setValue).toBeCalledWith('value1');
    });
  });

  describe('when clears value', () => {
    test('calls setValue', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(<ClearableInput {...props} />);
      // Act
      await userEvent.click(getByLabelText('Clear'));
      // Assert
      expect(setValue).toBeCalledWith('');
    });
  });

  describe('when original value passed and clicks to refresh', () => {
    test('calls setValue', async () => {
      // Arange
      const originalValue = 'original value';
      const { getByLabelText } = renderWithTheme(
        <ClearableInput {...props} originalValue={originalValue} />
      );
      // Act
      await userEvent.click(getByLabelText('Refresh'));
      // Assert
      expect(setValue).toBeCalledWith(originalValue);
    });
  });
});
