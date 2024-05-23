import refreshToken from '@/auth/providers/utils/refreshToken';

const mockGetIdToken = jest.fn();
let withCurrentUser = true;

jest.mock('@/common/lib/firebase/client', () => ({
  auth: () => ({
    currentUser: withCurrentUser
      ? {
          getIdToken: mockGetIdToken,
        }
      : null,
  }),
}));

describe('RefreshToken', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when got user', () => {
    beforeEach(() => {
      withCurrentUser = true;
    });

    test('refreshes token', async () => {
      // Arrange
      // Act
      await refreshToken();
      // Assert
      expect(mockGetIdToken).toHaveBeenCalledWith(true);
    });
  });

  describe('when did not get user', () => {
    beforeEach(() => {
      withCurrentUser = false;
    });

    test('does not refresh token', async () => {
      // Arrange
      // Act
      await refreshToken();
      // Assert
      expect(mockGetIdToken).not.toHaveBeenCalled();
    });
  });
});
