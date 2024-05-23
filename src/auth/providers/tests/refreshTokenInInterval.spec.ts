import refreshTokenInInterval from '../utils/refreshTokenInInterval';

jest.mock('../utils/refreshToken', jest.fn());

describe('RefreshTokenInInterval', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  test('sets interval', () => {
    // Arrange
    // Act
    refreshTokenInInterval();
    // Assert
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 600000);
  });
});
