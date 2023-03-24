import { createContext } from 'react';

import { Alert, RemoveSpecificAlertFunction } from '@/types/alerts';

const AlertsContext = createContext<{
  alerts: Alert[];
  clearAll: () => void;
  createErrorAlert: RemoveSpecificAlertFunction;
  createInfoAlert: RemoveSpecificAlertFunction;
  createWarnAlert: RemoveSpecificAlertFunction;
  createSuccessAlert: RemoveSpecificAlertFunction;
}>({
  alerts: [],
  clearAll: () => {},
  createErrorAlert: () => {},
  createInfoAlert: () => {},
  createWarnAlert: () => {},
  createSuccessAlert: () => {},
});

export default AlertsContext;
