import { useEffect } from 'react';

import { CommonError } from '@/common/types/errors';

import useAlerts from '@/common/hooks/alerts/useAlerts';

const useErrorAlert = (error: CommonError | null) => {
  const { createErrorAlert } = useAlerts();

  useEffect(() => {
    if (error) createErrorAlert(error.message || error.code || error.status);
  }, [createErrorAlert, error]);
};

export default useErrorAlert;
