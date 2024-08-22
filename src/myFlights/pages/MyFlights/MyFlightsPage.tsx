import { useEffect } from 'react';

import { PageInfo, User } from '@/auth/types';
import { NotionError } from '@/common/types/notion';

import useAlerts from '@/common/hooks/alerts';

import PageTemplate from '@/common/templates/PageTemplate';

const SpottingPage = ({
  user,
  pages,
  data,
  error,
}: {
  user: User;
  pages: PageInfo[];
  data: any[] | null;
  error: NotionError | null;
}) => {
  const { createErrorAlert } = useAlerts();

  useEffect(() => {
    if (error) createErrorAlert(error.message || error.code || error.status);
  }, [createErrorAlert, error]);

  console.log(data);

  return (
    // <SpottingProvider data={data}>
    <PageTemplate title="My Flights" user={user} pages={pages}>
      My Flights
    </PageTemplate>
    // </SpottingProvider>
  );
};

export default SpottingPage;
