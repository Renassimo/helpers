import { useEffect } from 'react';

import { NotionError } from '@/common/types/notion';
import { PageInfo, User } from '@/auth/types';
import { MyFlightData } from '@/myFlights/types';

import useAlerts from '@/common/hooks/alerts';

import PageTemplate from '@/common/templates/PageTemplate';

import FlightsProvider from '@/myFlights/providers/FlightsProvider';

import MyFlights from '@/myFlights/components/MyFlights';

const MyFlightsPage = ({
  user,
  pages,
  data,
  error,
}: {
  user: User;
  pages: PageInfo[];
  data: MyFlightData[] | null;
  error: NotionError | null;
}) => {
  const { createErrorAlert } = useAlerts();

  useEffect(() => {
    if (error) createErrorAlert(error.message || error.code || error.status);
  }, [createErrorAlert, error]);

  return (
    <FlightsProvider data={data}>
      <PageTemplate title="My Flights" user={user} pages={pages}>
        <MyFlights />
      </PageTemplate>
    </FlightsProvider>
  );
};

export default MyFlightsPage;
