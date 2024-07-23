import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { getInvertedBWColor, onColorPick } from '@/common/utils/colors';

import { HexColorPicker } from 'react-colorful';

import SimpleModal from '@/common/components/Modal/SimpleModal';

import ColorPicker from '../ColorPicker';
import MockedModal from '@/common/components/Modal/mocks';

jest.mock('@/common/utils/colors');
jest.mock('react-colorful');
jest.mock('@/common/components/Modal/SimpleModal');

describe('ColorPicker', () => {
  const mockedName = 'name';
  const mockedLabel = 'label';
  const mockedValue = '#def';
  const mockedOnChange = jest.fn();
  const mockedBWInvertedColor = '#abc';
  const mockedBWGetInvertedColor = jest.fn(() => mockedBWInvertedColor);
  const mockedPickedColor = '#789';
  const mockedOnColorPick = jest.fn(() => mockedPickedColor);
  const MockedHexColorPicker = jest.fn(({ color }) => (
    <div>MockedHexColorPicker - {color}</div>
  ));

  beforeEach(() => {
    (getInvertedBWColor as unknown as jest.Mock).mockImplementation(
      mockedBWGetInvertedColor
    );
    (onColorPick as unknown as jest.Mock).mockImplementation(mockedOnColorPick);
    (HexColorPicker as unknown as jest.Mock).mockImplementation(
      MockedHexColorPicker
    );
    (SimpleModal as unknown as jest.Mock).mockImplementation(MockedModal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders snapshot successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <ColorPicker
        name={mockedName}
        label={mockedLabel}
        value={mockedValue}
        onChange={mockedOnChange}
      />
    );
    // Assert
    expect(mockedBWGetInvertedColor).toHaveBeenCalledWith(mockedValue);
    expect(MockedHexColorPicker).toHaveBeenCalledWith(
      { color: mockedValue, onChange: expect.any(Function) },
      {}
    );
    expect(baseElement).toMatchSnapshot();
  });

  describe('when error passed', () => {
    test('renders snapshot successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <ColorPicker
          name={mockedName}
          label={mockedLabel}
          value={mockedValue}
          onChange={mockedOnChange}
          error="Error hapenned"
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when value is changed', () => {
    test('calls onChange', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <ColorPicker
          name={mockedName}
          label={mockedLabel}
          value={mockedValue}
          onChange={mockedOnChange}
        />
      );
      // Act
      await userEvent.clear(getByLabelText(mockedLabel));
      // Assert
      expect(mockedOnChange).toHaveBeenCalledWith('');
    });
  });

  describe('when color is picked', () => {
    test('call onColorPick', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <ColorPicker
          name={mockedName}
          label={mockedLabel}
          value={mockedValue}
          onChange={mockedOnChange}
        />
      );
      await userEvent.click(getByLabelText('colorize'));
      // Act
      await userEvent.click(
        getByLabelText(mockedLabel).parentElement?.parentElement
          ?.nextElementSibling as HTMLElement
      );
      // Assert
      expect(mockedOnColorPick).toHaveBeenCalledWith(mockedOnChange);
    });
  });

  describe('when color is demo is clicked', () => {
    test('opens modal', async () => {
      // Arange
      const { getByLabelText, baseElement } = renderWithTheme(
        <ColorPicker
          name={mockedName}
          label={mockedLabel}
          value={mockedValue}
          onChange={mockedOnChange}
        />
      );
      // Act
      await userEvent.click(
        getByLabelText(mockedLabel).parentElement?.parentElement
          ?.nextElementSibling as HTMLElement
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
