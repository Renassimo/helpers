import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import BaseAirportForm from '@/avia/components/BaseAirportForm';

const AirportForm = ({ title }: { title: 'Origin' | 'Destination' }) => {
  const key = title === 'Origin' ? 'originsResult' : 'destinationsResult';
  const { [key]: airportsResult } = useMyFlightsContext();

  return <BaseAirportForm title={title} airportsResult={airportsResult} />;
};

export default AirportForm;
