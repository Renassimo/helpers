import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { KeyboardEvent, ReactNode } from 'react';

import AviaInput from '../AviaInput';

describe('AviaInput', () => {
  const renderAviaInput = (props: {
    title: string;
    placeholder?: string;
    label?: string;
    value: string;
    setValue: (value: string) => void;
    disabled: boolean;
    onKeyDown: (event: KeyboardEvent) => void;
    adornments: ReactNode;
  }) => renderWithTheme(<AviaInput {...props} />);

  const setValue = jest.fn();
  const onKeyDown = jest.fn();

  const additionalProps = {
    placeholder: 'Placeholder',
    label: 'Label',
  };

  const defaultProps = {
    title: 'Title',
    value: 'Value',
    setValue,
    disabled: false,
    onKeyDown,
    adornments: <div>Adornments</div>,
  };

  const fullProps = {
    ...defaultProps,
    ...additionalProps,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderAviaInput(defaultProps);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when empty value passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderAviaInput({ ...fullProps, value: '' });
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when full props passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderAviaInput(fullProps);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when updates value', () => {
    test('calls setValue', async () => {
      // Arange
      const { getByLabelText } = renderAviaInput(defaultProps);
      // Act
      await userEvent.type(getByLabelText('Title'), '-');
      // Assert
      expect(setValue).toHaveBeenCalledWith('Value-');
      expect(onKeyDown).toHaveBeenCalled();
    });
  });

  describe('when clicks clear', () => {
    test('calls setValue', async () => {
      // Arange
      const { getByLabelText } = renderAviaInput(defaultProps);
      // Act
      await userEvent.click(getByLabelText('Clear'));
      // Assert
      expect(setValue).toHaveBeenCalledWith('');
    });
  });

  describe('when disabled passed', () => {
    const props = {
      ...defaultProps,
      disabled: true,
    };

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderAviaInput(props);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when tries to update value', () => {
      test('does not call setValue', async () => {
        // Arange
        const { getByLabelText } = renderAviaInput(props);
        // Act
        await userEvent.type(getByLabelText('Title'), '-');
        // Assert
        expect(setValue).not.toHaveBeenCalled();
      });
    });
  });
});
