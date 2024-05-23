import { createContext } from 'react';

import { RemoveSpecificAlertFunction } from '@/common/types/alerts';

const AlertsContext = createContext<{
  clearAll: () => void;
  createErrorAlert: RemoveSpecificAlertFunction;
  createInfoAlert: RemoveSpecificAlertFunction;
  createWarnAlert: RemoveSpecificAlertFunction;
  createSuccessAlert: RemoveSpecificAlertFunction;
}>({
  clearAll: () => {},
  createErrorAlert: () => {},
  createInfoAlert: () => {},
  createWarnAlert: () => {},
  createSuccessAlert: () => {},
});

export default AlertsContext;
