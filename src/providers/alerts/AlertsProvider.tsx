import { ReactNode } from 'react';

import AlertsContext from '@/contexts/alerts';

import Alerts from '@/components/common/Alerts';

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
