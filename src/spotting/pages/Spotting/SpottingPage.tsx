import { useEffect } from 'react';

import { PageInfo, User } from '@/types/auth';
import { NotionError } from '@/types/notion';
import { SpottedPlaneApiData } from '@/types/spotting';

import SpottingProvider from '@/providers/spotting/SpottingProvider';

import useAlerts from '@/common/hooks/alerts';

import PageTemplate from '@/common/templates/PageTemplate';
import SpottedPlanesList from '@/spotting/components/SpottedPlanesList';

const SpottingPage = ({
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
      <PageTemplate title="5book" user={user} pages={pages}>
        <SpottedPlanesList />
      </PageTemplate>
    </SpottingProvider>
  );
};

export default SpottingPage;
