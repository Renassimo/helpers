import { ReactNode, useCallback, useState } from 'react';

import { AlertColor } from '@mui/material';

import { Alert } from '@/common/types/alerts';

const DEFAULT_LIFETIME = 5000;

const useAlertsProvider = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = useCallback(
    (id: number) => {
      setAlerts((alerts: Alert[]) =>
        alerts.filter((alert: Alert) => alert.id !== id)
      );
    },
    [setAlerts]
  );

  const createAlert = useCallback(
    (
      text: string | number | ReactNode,
      severity: AlertColor = 'info',
      lifetime?: number
    ) => {
      const id = Number(new Date());
      setAlerts((alerts: Alert[]) => [...alerts, { id, text, severity }]);
      if (lifetime && lifetime > 0) {
        setTimeout(() => {
          removeAlert(id);
        }, lifetime);
      }
    },
    [setAlerts, removeAlert]
  );

  const createErrorAlert = useCallback(
    (text: string | number | ReactNode, lifetime?: number) =>
      createAlert(text, 'error', lifetime),
    [createAlert]
  );

  const createInfoAlert = useCallback(
    (text: string | number | ReactNode, lifetime = DEFAULT_LIFETIME) =>
      createAlert(text, 'info', lifetime),
    [createAlert]
  );

  const createWarnAlert = useCallback(
    (text: string | number | ReactNode, lifetime = DEFAULT_LIFETIME) =>
      createAlert(text, 'warning', lifetime),
    [createAlert]
  );

  const createSuccessAlert = useCallback(
    (text: string | number | ReactNode, lifetime = DEFAULT_LIFETIME) =>
      createAlert(text, 'success', lifetime),
    [createAlert]
  );

  const clearAll = useCallback(() => setAlerts([]), [setAlerts]);

  return {
    alerts,
    createErrorAlert,
    createInfoAlert,
    createWarnAlert,
    createSuccessAlert,
    clearAll,
    removeAlert,
  };
};

export default useAlertsProvider;
