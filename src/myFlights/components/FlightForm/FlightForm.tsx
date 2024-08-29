import { KeyboardEvent } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import useInputValue from '@/common/hooks/useInputValue';

import FlightCard from '@/myFlights/components/FlightCard';
import AviaInput from '@/avia/components/AviaInput';

const FlightForm = () => {
  const {
    flightsResult: {
      flights,
      chosenFlight,
      retreiveFlights,
      chooseFlight,
      clearChosenFlight,
      loading,
    },
  } = useMyFlightsContext();

  const [flightValue, setFlightValue] = useInputValue();

  const onSubmit = async () => {
    await retreiveFlights(flightValue);
  };

  const lengthOk = flightValue.length > 2;

  const onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && lengthOk) onSubmit();
  };

  return (
    <Box>
      {!chosenFlight && (
        <AviaInput
          title="Flight number"
          value={flightValue}
          setValue={setFlightValue}
          disabled={loading}
          onKeyDown={onEnter}
          adornments={
            <IconButton
              size="small"
              onClick={onSubmit}
              disabled={loading || !lengthOk}
              aria-label="Search"
            >
              <SearchIcon />
            </IconButton>
          }
        />
      )}
      {flights && !chosenFlight && (
        <Box display="flex" overflow="auto">
          {flights.map((flight, index) => (
            <Box
              key={flight.id + index}
              mr={1}
              ml={index === 0 ? 1 : undefined}
            >
              <FlightCard
                data={flight}
                onClick={() => chooseFlight(flight.id)}
              />
            </Box>
          ))}
        </Box>
      )}
      {chosenFlight && (
        <FlightCard data={chosenFlight} onClick={clearChosenFlight} chosen />
      )}
    </Box>
  );
};

export default FlightForm;
