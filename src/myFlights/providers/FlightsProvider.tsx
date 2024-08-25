import { ReactNode } from 'react';

import { MyFlightData } from '@/myFlights/types';

import FlightsContext from '@/myFlights/contexts/FlightsContext';

import useFlightsProvider from '@/myFlights/providers/hooks/useFlightsProvider';

const FlightsProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: MyFlightData[] | null;
}) => {
  const data = useFlightsProvider(apiData);

  return (
    <FlightsContext.Provider value={data}>{children}</FlightsContext.Provider>
  );
};

export default FlightsProvider;
