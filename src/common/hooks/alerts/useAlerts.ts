import { useContext } from 'react';

import AlertsContext from '@/common/contexts/AlertsContext';

const useAlerts = () => useContext(AlertsContext);

export default useAlerts;
