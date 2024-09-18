import { ReactNode } from 'react';

import { MyFlightData } from '@/myFlights/types';

import MyFlightsContext from '@/myFlights/contexts/MyFlightsContext';

import useMyFlightsProvider from '@/myFlights/providers/hooks/useMyFlightsProvider';

const MyFlightsProvider = ({
  children,
  data: apiData,
  nextCursor = null,
}: {
  children: ReactNode;
  data: MyFlightData[] | null;
  nextCursor: string | null;
}) => {
  const data = useMyFlightsProvider(apiData, nextCursor);

  return (
    <MyFlightsContext.Provider value={data}>
      {children}
    </MyFlightsContext.Provider>
  );
};

export default MyFlightsProvider;
