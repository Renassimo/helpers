import { ReactNode } from 'react';

import { MyFlightData } from '@/myFlights/types';

import MyFlightsContext from '@/myFlights/contexts/MyFlightsContext';

import useMyFlightsProvider from '@/myFlights/providers/hooks/useMyFlightsProvider';

const MyFlightsProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: MyFlightData[] | null;
}) => {
  const data = useMyFlightsProvider(apiData);

  return (
    <MyFlightsContext.Provider value={data}>
      {children}
    </MyFlightsContext.Provider>
  );
};

export default MyFlightsProvider;
