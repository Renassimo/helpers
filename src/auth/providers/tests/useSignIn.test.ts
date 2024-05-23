import Router from 'next/router';
import { renderHook, cleanup, act } from '@testing-library/react';

import useAlerts from '@/common/hooks/alerts';

import useSignIn from '../hooks/useSignIn';

let mockedSignInWithPopup: () => void = jest.fn();
const googleAuthProviderMockedMethod = jest.fn();

jest.mock('@/common/hooks/alerts');
jest.mock('next/router', () => ({
  push: jest.fn(),
}));
jest.mock('@/common/lib/firebase/google', () => {
  return jest.fn().mockImplementation(() => ({
    googleAuthProviderMethod: googleAuthProviderMockedMethod,
  }));
});
jest.mock('@/common/lib/firebase/client', () => ({
  auth: () => ({
    signInWithPopup: mockedSignInWithPopup,
  }),
}));

describe('UseSignIn', () => {
  const mockedCreateErrorAlert = jest.fn();

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementationOnce(() => ({
      createErrorAlert: mockedCreateErrorAlert,
    }));
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

  describe('when got error', () => {
    beforeEach(() => {
      mockedSignInWithPopup = () => {
        throw new Error('new error');
      };
    });

    test('creates alert', async () => {
      // Arrange
      const { result } = renderHook(() => useSignIn());
      const { current: signIn } = result;
      // Act
      await act(() => {
        signIn();
      });
      // Assert
      expect(mockedCreateErrorAlert).toHaveBeenCalledWith('new error');
    });
  });
});
