import invert from 'invert-color';

import { getInvertedBWColor, isValidHex, onColorPick } from '..';

jest.mock('invert-color');

describe('color utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInvertedBWColor', () => {
    test('return inverted color', () => {
      // Arange
      const mockedColor = '#000';
      const mockedBWInvertedColor = '#fff';
      const mockedInvert = jest.fn(() => mockedBWInvertedColor);
      (invert as unknown as jest.Mock).mockImplementationOnce(mockedInvert);
      // Act
      const result = getInvertedBWColor(mockedColor);
      // Assert
      expect(result).toEqual(mockedBWInvertedColor);
      expect(mockedInvert).toHaveBeenCalledWith(mockedColor, true);
    });

    describe('when error happens', () => {
      test('returns black', () => {
        // Arange
        const mockedColor = '#fff';
        const mockedBWInvertedColor = '#000';
        const mockedInvert = jest.fn(() => {
          throw new Error('error');
        });
        (invert as unknown as jest.Mock).mockImplementationOnce(mockedInvert);
        // Act
        const result = getInvertedBWColor(mockedColor);
        // Assert
        expect(result).toEqual(mockedBWInvertedColor);
        expect(mockedInvert).toHaveBeenCalledWith(mockedColor, true);
      });
    });
  });

  describe('onColorPick', () => {
    const mockedCallback = jest.fn();
    const mockedErrorCallback = jest.fn();

    afterEach(() => {
      // @ts-ignore
      delete globalThis.window;
    });

    test('call passed callback', async () => {
      // Arange
      const mockedColorValue = '#123';
      Object.defineProperty(globalThis, 'window', {
        value: {
          EyeDropper: class {
            async open() {
              return { sRGBHex: mockedColorValue };
            }
          },
        },
      });
      // Act
      await onColorPick(mockedCallback);
      // Assert
      expect(mockedCallback).toBeCalledWith(mockedColorValue);
      expect(mockedErrorCallback).not.toHaveBeenCalled();
    });

    describe('when error happened', () => {
      test('call error callback', async () => {
        // Arange
        const mockedError = new Error('Error happened');
        Object.defineProperty(globalThis, 'window', {
          value: {
            EyeDropper: class {
              async open() {
                throw mockedError;
              }
            },
          },
        });
        // Act
        await onColorPick(mockedCallback, mockedErrorCallback);
        // Assert
        expect(mockedCallback).not.toHaveBeenCalled();
        expect(mockedErrorCallback).toBeCalledWith(mockedError);
      });
    });

    describe('when window is not defined', () => {
      test('does not call passed callbacks', async () => {
        // Arange
        // Act
        await onColorPick(mockedCallback);
        // Assert
        expect(mockedCallback).not.toHaveBeenCalled();
      });
    });
  });

  describe('isValidHex', () => {
    test('validates variaous hex', () => {
      // Arange
      // Act
      // Assert
      expect(isValidHex('#')).toBeFalsy();
      expect(isValidHex('#0')).toBeFalsy();
      expect(isValidHex('#00')).toBeFalsy();
      expect(isValidHex('#000')).toBeTruthy();
      expect(isValidHex('#0000')).toBeFalsy();
      expect(isValidHex('#00000')).toBeFalsy();
      expect(isValidHex('#000000')).toBeTruthy();
      expect(isValidHex('#0000000')).toBeFalsy();
      expect(isValidHex('#fff')).toBeTruthy();
      expect(isValidHex('#ffffff')).toBeTruthy();
      expect(isValidHex('#ggg')).toBeFalsy();
      expect(isValidHex('#gggggg')).toBeFalsy();
      expect(isValidHex('000000')).toBeFalsy();
      expect(isValidHex('0000')).toBeFalsy();
    });
  });
});
