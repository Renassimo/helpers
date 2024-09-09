import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import FreeAutoComplete, { FreeAutoCompleteProps } from '../FreeAutoComplete';

describe('FreeAutoComplete', () => {
  const label = 'Label';
  const setValue = jest.fn();
  const options = ['Option 1', 'Variant 2', 'Opt 3', 'Var 4'];
  const defaultProps: FreeAutoCompleteProps = {
    setValue,
    options,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <FreeAutoComplete {...defaultProps} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when clicks to input', () => {
    const props = {
      ...defaultProps,
      label,
    };

    test('renders successfully', async () => {
      // Arange
      const { baseElement, getByLabelText } = renderWithTheme(
        <FreeAutoComplete {...props} />
      );
      // Act
      await userEvent.click(getByLabelText(label));
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('and filters value', () => {
      test('renders successfully', async () => {
        // Arange
        const { baseElement, getByLabelText } = renderWithTheme(
          <FreeAutoComplete {...props} />
        );
        const input = getByLabelText(label);
        await userEvent.click(input);
        // Act
        await userEvent.type(input, 'Variant');
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('when chooses option', () => {
        test('calls setValue with passed arguments', async () => {
          // Arange
          const typedText = 'Variant';
          const { getByLabelText, getByText } = renderWithTheme(
            <FreeAutoComplete {...props} />
          );
          const input = getByLabelText(label);
          await userEvent.click(input);
          await userEvent.type(input, typedText);
          // Act
          await userEvent.click(getByText('Var 4'));
          // Assert
          expect(setValue).nthCalledWith(typedText.length + 1, 'Var 4');
        });
      });
    });
  });

  describe('when originalValue passed', () => {
    const originalValue = 'Varianto 2';
    const props = { ...defaultProps, originalValue };

    test('calls setValue with most proper option', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<FreeAutoComplete {...props} />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(setValue).nthCalledWith(1, 'Variant 2');
    });

    describe('when value and original value are the same', () => {
      test('calls setValue with passed arguments', async () => {
        // Arange
        // Act
        renderWithTheme(<FreeAutoComplete {...props} value={originalValue} />);
        // Assert
        expect(setValue).nthCalledWith(1, originalValue);
      });
    });

    describe('when matchers passed', () => {
      test('calls setValue with passed arguments from matcher', async () => {
        // Arange
        const matchers = {
          'Varianto 2': 'Var 4',
        };
        // Act
        renderWithTheme(<FreeAutoComplete {...props} matchers={matchers} />);
        // Assert
        expect(setValue).nthCalledWith(1, 'Var 4');
      });
    });

    describe('when does not find options', () => {
      test('does not call setValue', async () => {
        // Arange
        // Act
        renderWithTheme(
          <FreeAutoComplete {...props} originalValue={'9999999'} />
        );
        // Assert
        expect(setValue).not.toBeCalled();
      });
    });

    describe('when clicks to helper text', () => {
      test('calls setValue with passed arguments', async () => {
        // Arange
        const { getByText } = renderWithTheme(<FreeAutoComplete {...props} />);
        // Act
        await userEvent.click(getByText(originalValue));
        // Assert
        expect(setValue).nthCalledWith(1, 'Variant 2');
        expect(setValue).nthCalledWith(2, originalValue);
      });
    });
  });
});
