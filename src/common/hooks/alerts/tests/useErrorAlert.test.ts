import { renderHook } from '@testing-library/react-hooks';

import { CommonError } from '@/common/types/errors';

import useAlerts from '@/common/hooks/alerts/useAlerts';
import useErrorAlert from '../useErrorAlert';

jest.mock('@/common/hooks/alerts/useAlerts');

describe('useErrorAlert', () => {
  const mockedError: CommonError = { message: 'This is the error' };
  const mockedCreateErrorAlert = jest.fn();

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementationOnce(() => ({
      createErrorAlert: mockedCreateErrorAlert,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates error alert', () => {
    // Arange
    // Act
    renderHook(() => useErrorAlert(mockedError));
    // Assert
    expect(mockedCreateErrorAlert).toHaveBeenCalledWith('This is the error');
  });

  describe('when error is null', () => {
    test('dose not create error alert', () => {
      // Arange
      // Act
      renderHook(() => useErrorAlert(null));
      // Assert
      expect(mockedCreateErrorAlert).not.toHaveBeenCalled();
    });
  });
});
