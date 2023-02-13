import { renderHook } from '@testing-library/react-hooks';
import useUser from '../hooks/useUser';
import getIdTokenChangedCallback from '../utils/getIdTokenChangedCallback';

const mockOnIdTokenChanged = jest.fn();

jest.mock('@/lib/firebase/client', () => ({
  auth: () => ({
    onIdTokenChanged: mockOnIdTokenChanged,
  }),
}));
jest.mock('../utils/getIdTokenChangedCallback');

describe('useUser', () => {
  test('returns nullish user and calls id token change callback', () => {
    // Arrange
    const mockedCallback = jest.fn();
    const mockedGetIdTokenChangedCallback = jest.fn(() => mockedCallback);
    (getIdTokenChangedCallback as unknown as jest.Mock).mockImplementationOnce(
      mockedGetIdTokenChangedCallback
    );
    // Act
    const { result } = renderHook(() => useUser());
    // Assert
    expect(mockOnIdTokenChanged).toHaveBeenCalledWith(mockedCallback);
    expect(result.current).toEqual(null);
  });
});
