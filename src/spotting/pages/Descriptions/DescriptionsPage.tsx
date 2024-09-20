import { useEffect } from 'react';

import { PageInfo, User } from '@/auth/types';
import { NotionError } from '@/common/types/notion';
import { SpottedPlaneApiData } from '@/spotting/types';

import SpottingProvider from '@/spotting/providers/SpottingProvider';

import useAlerts from '@/common/hooks/alerts';

import PageTemplate from '@/common/templates/PageTemplate';
import SpottedPlanesList from '@/spotting/components/SpottedPlanesList';

const DescriptionsPage = ({
  user,
  pages,
  data,
  error,
}: {
  user: User;
  pages: PageInfo[];
  data: SpottedPlaneApiData[] | null;
  error: NotionError | null;
}) => {
  const { createErrorAlert } = useAlerts();

  useEffect(() => {
    if (error) createErrorAlert(error.message || error.code || error.status);
  }, [createErrorAlert, error]);

  return (
    <SpottingProvider data={data}>
      <PageTemplate title="Spotting" user={user} pages={pages}>
        <SpottedPlanesList />
      </PageTemplate>
    </SpottingProvider>
  );
};

export default DescriptionsPage;
