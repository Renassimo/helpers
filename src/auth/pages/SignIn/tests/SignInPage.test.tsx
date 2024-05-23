import renderWithTheme from '@/common/tests/helpers';
import userEvent from '@testing-library/user-event';

import useAuth from '@/auth/hooks/useAuth';

import SignInPage from '../SignInPage';

jest.mock('@/auth/hooks/useAuth');

describe('SignInPage', () => {
  test('calls sign in', async () => {
    // Arrange
    const mockedSignIn = jest.fn();
    const mockedUseAuth = jest.fn(() => ({ signIn: mockedSignIn }));
    (useAuth as unknown as jest.Mock).mockImplementationOnce(mockedUseAuth);
    const { getByText } = renderWithTheme(<SignInPage />);
    // Act
    await userEvent.click(getByText('Sign In'));
    // Assert
    expect(mockedSignIn).toHaveBeenCalled();
  });
});
