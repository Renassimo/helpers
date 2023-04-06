import Router from 'next/router';
import { renderHook, cleanup, act } from '@testing-library/react';

import useAlerts from '@/hooks/alerts';

import useSignOut from '../hooks/useSignOut';

let mockSignOut: () => void = jest.fn();

jest.mock('@/hooks/alerts');
jest.mock('next/router', () => ({
  reload: jest.fn(),
}));
jest.mock('@/lib/firebase/client', () => ({
  auth: () => ({
    signOut: mockSignOut,
  }),
}));

describe('UseSignOut', () => {
  const mockedCreateErrorAlert = jest.fn();

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementationOnce(() => ({
      createErrorAlert: mockedCreateErrorAlert,
    }));
  });

  test('signs out', async () => {
    // Arrange
    const mockedReload = jest.fn();

    const { result } = renderHook(() => useSignOut());
    const { current: signOut } = result;

    (Router.reload as unknown as jest.Mock).mockImplementationOnce(
      mockedReload
    );

    // Act
    await act(() => {
      signOut();
    });
    // Assert
    expect(mockSignOut).toHaveBeenCalledWith();
    expect(mockedReload).toHaveBeenCalled();
  });

  describe('when got error', () => {
    beforeEach(() => {
      mockSignOut = () => {
        throw new Error('new error');
      };
    });

    test('creates alert', async () => {
      // Arrange
      const { result } = renderHook(() => useSignOut());
      const { current: signOut } = result;
      // Act
      await act(() => {
        signOut();
      });
      // Assert
      expect(mockedCreateErrorAlert).toHaveBeenCalledWith('new error');
    });
  });
});
