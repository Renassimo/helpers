import Router from 'next/router';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useSignOut from '../hooks/useSignOut';

const mockSignOut = jest.fn();

jest.mock('next/router', () => ({
  reload: jest.fn(),
}));
jest.mock('@/lib/firebase/client', () => ({
  auth: () => ({
    signOut: mockSignOut,
  }),
}));

describe('UseSignOut', () => {
  afterEach(() => {
    cleanup();
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
});
