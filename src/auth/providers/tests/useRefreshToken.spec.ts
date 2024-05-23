import { renderHook, cleanup } from '@testing-library/react';
import useRefreshToken from '../hooks/useRefreshToken';
import refreshTokenInInterval from '../utils/refreshTokenInInterval';

jest.mock('../utils/refreshTokenInInterval');
jest.mock('@/lib/firebase/client', jest.fn());

describe('UseRefreshToken', () => {
  afterEach(() => {
    cleanup();
  });

  test('sets refresh token function', async () => {
    // Arrange
    const mockedRefreshTokenInInterval = jest.fn();
    (refreshTokenInInterval as unknown as jest.Mock).mockImplementationOnce(
      mockedRefreshTokenInInterval
    );
    // Act
    renderHook(() => useRefreshToken());
    // Assert
    expect(mockedRefreshTokenInInterval).toHaveBeenCalled();
  });
});
