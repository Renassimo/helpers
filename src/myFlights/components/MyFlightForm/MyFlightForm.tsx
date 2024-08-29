import Box from '@mui/material/Box';

import AircraftForm from '@/myFlights/components/AircraftForm';
import AirportForm from '@/myFlights/components/AirportForm';
import FlightForm from '@/myFlights/components/FlightForm';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

const MyFlightForm = () => {
  const {
    flightsResult: { chosenFlight },
  } = useMyFlightsContext();

  const { attributes } = chosenFlight ?? {};
  const { origin, destination, registration } = attributes ?? {};

  return (
    <Box>
      <FlightForm />
      {!origin && <AirportForm title="Origin" />}
      {!destination && <AirportForm title="Destination" />}
      <AircraftForm registration={registration} />
    </Box>
  );
};

export default MyFlightForm;
