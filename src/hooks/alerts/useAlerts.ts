import { useContext } from 'react';

import AlertsContext from '@/contexts/alerts';

const useAlerts = () => useContext(AlertsContext);

export default useAlerts;
