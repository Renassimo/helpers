import { act, renderHook } from '@testing-library/react-hooks';

import useAlertsProvider from '@/common/providers/alerts/hooks/useAlertsProvider';

import { Alert } from '@/types/alerts';

describe('useAlerts', () => {
  const errorText = 'new error';
  const infoText = 'new info';
  const successText = 'new success';
  const warnText = 'new warning';

  const errorAlert = {
    id: 1679184001000,
    severity: 'error',
    text: errorText,
  };
  const infoAlert = {
    id: 1679184002000,
    severity: 'info',
    text: infoText,
  };
  const successAlert = {
    id: 1679184003000,
    severity: 'success',
    text: successText,
  };
  const warnAlert = {
    id: 1679184004000,
    severity: 'warning',
    text: warnText,
  };

  afterEach(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  const createMockedAlerts = () => {
    const { result } = renderHook(() => useAlertsProvider());
    act(() => {
      jest.setSystemTime(new Date('2023-03-19T00:00:01.000Z'));
      result.current.createErrorAlert(errorText, 0);
      jest.setSystemTime(new Date('2023-03-19T00:00:02.000Z'));
      result.current.createInfoAlert(infoText, 0);
      jest.setSystemTime(new Date('2023-03-19T00:00:03.000Z'));
      result.current.createSuccessAlert(successText, 0);
      jest.setSystemTime(new Date('2023-03-19T00:00:04.000Z'));
      result.current.createWarnAlert(warnText, 0);
    });
    return result;
  };

  test('returns list of alerts', async () => {
    // Arrange
    const expectedAlerts = [errorAlert, infoAlert, successAlert, warnAlert];
    // Act
    const result = createMockedAlerts();
    // Assert
    expect(result.current.alerts).toEqual(expectedAlerts);
  });

  describe('when remove alerts', () => {
    test('returns list without removed alert', () => {
      // Arrange
      const expectedAlerts = [errorAlert, successAlert, warnAlert];
      const result = createMockedAlerts();
      // Act
      act(() => {
        result.current.removeAlert(infoAlert.id);
      });
      // Assert
      expect(result.current.alerts).toEqual(expectedAlerts);
    });
  });

  describe('when clear all alerts', () => {
    test('returns empty list', () => {
      // Arrange
      const expectedAlerts: Alert[] = [];
      const result = createMockedAlerts();
      // Act
      act(() => {
        result.current.clearAll();
      });
      // Assert
      expect(result.current.alerts).toEqual(expectedAlerts);
    });
  });

  describe('when create alerts with lifetime', () => {
    beforeEach(() => {
      jest.spyOn(global, 'setTimeout');
    });

    test('triggers setTimeout, and returns only existed before alerts', () => {
      // Arrange
      const expectedAlerts = [errorAlert, infoAlert, successAlert, warnAlert];
      const result = createMockedAlerts();
      // Act
      act(() => {
        jest.setSystemTime(new Date('2023-03-19T00:01:01.000Z'));
        result.current.createErrorAlert(errorText, 1000);
        jest.setSystemTime(new Date('2023-03-19T00:01:02.000Z'));
        result.current.createInfoAlert(infoText);
        jest.setSystemTime(new Date('2023-03-19T00:01:03.000Z'));
        result.current.createSuccessAlert(successText);
        jest.setSystemTime(new Date('2023-03-19T00:01:04.000Z'));
        result.current.createWarnAlert(warnText);
        jest.setSystemTime(new Date('2023-03-19T00:02:02.000Z'));
        result.current.createInfoAlert(infoText, 2000);
        jest.setSystemTime(new Date('2023-03-19T00:02:03.000Z'));
        result.current.createSuccessAlert(successText, 3000);
        jest.setSystemTime(new Date('2023-03-19T00:02:04.000Z'));
        result.current.createWarnAlert(warnText, 4000);
      });
      jest.runAllTimers();
      // Assert
      expect(setTimeout).toHaveBeenCalledTimes(7);
      expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 1000);
      expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 5000);
      expect(setTimeout).toHaveBeenNthCalledWith(3, expect.any(Function), 5000);
      expect(setTimeout).toHaveBeenNthCalledWith(4, expect.any(Function), 5000);
      expect(setTimeout).toHaveBeenNthCalledWith(5, expect.any(Function), 2000);
      expect(setTimeout).toHaveBeenNthCalledWith(6, expect.any(Function), 3000);
      expect(setTimeout).toHaveBeenNthCalledWith(7, expect.any(Function), 4000);
      expect(result.current.alerts).toEqual(expectedAlerts);
    });
  });
});
