import { ReactNode } from 'react';

import { FlightData } from '@/myFlights/types';

import FlightsContext from '@/myFlights/contexts/FlightsContext';

import useFlightsProvider from '@/myFlights/providers/hooks/useFlightsProvider';

const FlightsProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: FlightData[] | null;
}) => {
  const data = useFlightsProvider(apiData);

  return (
    <FlightsContext.Provider value={data}>{children}</FlightsContext.Provider>
  );
};

export default FlightsProvider;
