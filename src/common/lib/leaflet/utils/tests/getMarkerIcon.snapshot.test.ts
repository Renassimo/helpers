import getMarkerIcon from '../getMarkerIcon';

import invert from 'invert-color';

jest.mock('invert-color');

describe('getMarkerIcon snapshot', () => {
  const mockedInvertedColor = '#000';
  const mockedInvert = jest.fn(() => mockedInvertedColor);

  beforeEach(() => {
    (invert as unknown as jest.Mock).mockImplementationOnce(mockedInvert);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('matches snapshot', () => {
    // Arange
    // Act
    const result = getMarkerIcon();
    // Assert
    expect(mockedInvert).toHaveBeenCalledWith('#ffffff', true);
    expect(result).toMatchSnapshot();
  });

  describe('when params passed', () => {
    test('matches snapshot', () => {
      // Arange
      const mockedColor = '#123456';
      // Act
      const result = getMarkerIcon(mockedColor, true, true);
      // Assert
      expect(mockedInvert).toHaveBeenCalledWith(mockedColor, true);
      expect(result).toMatchSnapshot();
    });
  });
});
