import renderWithTheme from '@/tests/helpers';

import useAuth from '@/auth/hooks/useAuth';

import SignInPage from '../SignInPage';

jest.mock('@/auth/hooks/useAuth');

describe('SignInPage snapshots', () => {
  test('renders successfully', () => {
    // Arrange
    const mockedSignIn = jest.fn();
    const mockedUseAuth = jest.fn(() => ({ signIn: mockedSignIn }));
    (useAuth as unknown as jest.Mock).mockImplementationOnce(mockedUseAuth);
    // Act
    const { baseElement } = renderWithTheme(<SignInPage />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
