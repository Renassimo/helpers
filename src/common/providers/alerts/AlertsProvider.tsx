import { ReactNode } from 'react';

import AlertsContext from '@/common/contexts/AlertsContext';

import Alerts from '@/common/components/Alerts';

import useAlertsProvider from './hooks/useAlertsProvider';

const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const {
    alerts,
    createErrorAlert,
    createInfoAlert,
    createWarnAlert,
    createSuccessAlert,
    clearAll,
    removeAlert,
  } = useAlertsProvider();

  const value = {
    clearAll,
    createErrorAlert,
    createInfoAlert,
    createWarnAlert,
    createSuccessAlert,
  };

  return (
    <AlertsContext.Provider value={value}>
      {children}
      <Alerts alerts={alerts} removeAlert={removeAlert} />
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
