import Router from 'next/router';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useSignIn from '../hooks/useSignIn';

const mockedSignInWithPopup = jest.fn();
const googleAuthProviderMockedMethod = jest.fn();

jest.mock('next/router', () => ({
  push: jest.fn(),
}));
jest.mock('@/lib/firebase/google', () => {
  return jest.fn().mockImplementation(() => ({
    googleAuthProviderMethod: googleAuthProviderMockedMethod,
  }));
});
jest.mock('@/lib/firebase/client', () => ({
  auth: () => ({
    signInWithPopup: mockedSignInWithPopup,
  }),
}));

describe('UseSignIn', () => {
  afterEach(() => {
    cleanup();
  });

  test('signs in', async () => {
    // Arrange
    const { result } = renderHook(() => useSignIn());
    const { current: signIn } = result;
    // Act
    await act(() => {
      signIn();
    });
    // Assert
    expect(mockedSignInWithPopup).toHaveBeenCalledWith({
      googleAuthProviderMethod: googleAuthProviderMockedMethod,
    });
  });

  describe('when redirect url passed', () => {
    test('signs in with redirect', async () => {
      // Arrange
      const redirectUrl = 'redirect-url';
      const mockedPush = jest.fn();

      const { result } = renderHook(() => useSignIn());
      const { current: signIn } = result;

      (Router.push as unknown as jest.Mock).mockImplementationOnce(mockedPush);

      // Act
      await act(() => {
        signIn(redirectUrl);
      });
      // Assert
      expect(mockedSignInWithPopup).toHaveBeenCalledWith({
        googleAuthProviderMethod: googleAuthProviderMockedMethod,
      });
      expect(mockedPush).toHaveBeenCalledWith(redirectUrl);
    });
  });
});
