import geoLocation from '../geoLocation';

describe('geoLocation', () => {
  const callback = jest.fn();
  const errorCallback = jest.fn();
  const notSupportedCallback = jest.fn();
  const preCall = jest.fn();

  afterEach(() => {
    // @ts-ignore
    delete globalThis.navigator;
    jest.clearAllMocks();
  });

  test('calls callbacks', () => {
    // Arange
    const getCurrentPosition = jest.fn((callback) => {
      callback('callback-value');
    });
    const geolocation = {
      getCurrentPosition,
    };
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        geolocation,
      },
      configurable: true,
    });
    // Act
    geoLocation(callback, errorCallback, notSupportedCallback, preCall);
    // Assert
    expect(preCall).toBeCalledWith();
    expect(getCurrentPosition).toBeCalledWith(callback, errorCallback);
    expect(callback).toBeCalledWith('callback-value');
    expect(errorCallback).not.toBeCalled();
    expect(notSupportedCallback).not.toBeCalled();
  });

  describe('when fails to get position', () => {
    test('calls errorCallback', () => {
      // Arange
      const getCurrentPosition = jest.fn((callback, errorCallback) => {
        errorCallback('error-callback-value');
      });
      const geolocation = {
        getCurrentPosition,
      };
      Object.defineProperty(globalThis, 'navigator', {
        value: {
          geolocation,
        },
        configurable: true,
      });
      // Act
      geoLocation(callback, errorCallback, notSupportedCallback, preCall);
      // Assert
      expect(preCall).toBeCalledWith();
      expect(getCurrentPosition).toBeCalledWith(callback, errorCallback);
      expect(callback).not.toBeCalled();
      expect(errorCallback).toBeCalledWith('error-callback-value');
      expect(notSupportedCallback).not.toBeCalled();
    });
  });

  describe('when geoposition not supported', () => {
    test('calls notSupportedCallback', () => {
      // Arange
      Object.defineProperty(globalThis, 'navigator', {
        value: {},
        configurable: true,
      });
      // Act
      geoLocation(callback, errorCallback, notSupportedCallback, preCall);
      // Assert
      expect(preCall).not.toBeCalled();
      expect(callback).not.toBeCalled();
      expect(errorCallback).not.toBeCalled();
      expect(notSupportedCallback).toBeCalledWith('Geolocation not supported');
    });
  });
});
