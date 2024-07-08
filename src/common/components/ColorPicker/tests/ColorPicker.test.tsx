import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { getInvertedBWColor, onColorPick } from '@/common/utils/colors';

import ColorPicker from '../ColorPicker';

jest.mock('@/common/utils/colors');

describe('ColorPicker', () => {
  const mockedName = 'name';
  const mockedLabel = 'label';
  const mockedValue = '#def';
  const mockedOnChange = jest.fn();
  const mockedBWInvertedColor = '#abc';
  const mockedBWGetInvertedColor = jest.fn(() => mockedBWInvertedColor);
  const mockedPickedColor = '#789';
  const mockedOnColorPick = jest.fn(() => mockedPickedColor);

  beforeEach(() => {
    (getInvertedBWColor as unknown as jest.Mock).mockImplementation(
      mockedBWGetInvertedColor
    );
    (onColorPick as unknown as jest.Mock).mockImplementation(mockedOnColorPick);
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
    expect(baseElement).toMatchSnapshot();
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
      // Act
      await userEvent.click(
        getByLabelText(mockedLabel).parentElement?.parentElement
          ?.nextElementSibling as HTMLElement
      );
      // Assert
      expect(mockedOnColorPick).toHaveBeenCalledWith(mockedOnChange);
    });
  });
});
