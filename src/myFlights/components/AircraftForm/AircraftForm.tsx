import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import BaseAircraftForm from '@/avia/components/BaseAircraftForm';

const AircraftForm = ({ registration }: { registration?: string | null }) => {
  const { aircraftsResult } = useMyFlightsContext();

  return (
    <BaseAircraftForm
      registration={registration}
      aircraftsResult={aircraftsResult}
    />
  );
};

export default AircraftForm;
