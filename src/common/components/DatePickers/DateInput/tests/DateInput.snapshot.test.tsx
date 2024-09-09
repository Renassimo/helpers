import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import DateInput from '../DateInput';

describe('DateInput snapshot', () => {
  const setValue = jest.fn();
  const defaultProps = { setValue };

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 1, 11));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<DateInput {...defaultProps} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when value passed', () => {
    const props = {
      ...defaultProps,
      value: '2020-10-10',
      label: 'Label',
    };

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<DateInput {...props} />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('and when original value passed', () => {
      const props = {
        ...defaultProps,
        value: '2020-10-10',
        originalValue: '2022-11-22',
        placeholder: 'Placeholder',
      };

      test('renders successfully', () => {
        // Arange
        // Act
        const { baseElement } = renderWithTheme(<DateInput {...props} />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('and when is disabled', () => {
        test('renders successfully', () => {
          // Arange
          // Act
          const { baseElement } = renderWithTheme(
            <DateInput {...props} disabled />
          );
          // Assert
          expect(baseElement).toMatchSnapshot();
        });
      });
    });
  });

  describe('when empty value passed', () => {
    const props = {
      ...defaultProps,
      value: null,
      fullWidth: true,
    };

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<DateInput {...props} />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('and when original value passed', () => {
      const props = {
        ...defaultProps,
        value: null,
        originalValue: '2022-11-22',
      };

      test('renders successfully', () => {
        // Arange
        // Act
        const { baseElement } = renderWithTheme(<DateInput {...props} />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('and when is disabled', () => {
        test('renders successfully', () => {
          // Arange
          // Act
          const { baseElement } = renderWithTheme(
            <DateInput {...props} disabled />
          );
          // Assert
          expect(baseElement).toMatchSnapshot();
        });
      });
    });
  });
});
