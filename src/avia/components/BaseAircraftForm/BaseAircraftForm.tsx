import { KeyboardEvent, useEffect } from 'react';

import { Avia } from '@/avia/types/avia';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import useStateValue from '@/common/hooks/useStateValue';

import AviaInput from '@/avia/components/AviaInput';
import AircraftCard from '@/avia/components/AircraftCard';

const BaseAircraftForm = ({
  registration = null,
  aircraftsResult: {
    aircrafts,
    chosenAircraft,
    retreiveAircrafts,
    chooseAircraft,
    clearChosenAircraft,
    loading,
  },
}: {
  registration?: string | null;
  aircraftsResult: Avia.AircraftsResult;
}) => {
  const [aircraftValue, setAircraftValue] = useStateValue('');

  const onSubmit = async () => {
    await retreiveAircrafts(aircraftValue);
  };

  const lengthOk = aircraftValue.length > 2;

  const onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && lengthOk) onSubmit();
  };

  useEffect(() => {
    if (!aircraftValue && registration) setAircraftValue(registration);
  }, [registration]);

  return (
    <Box>
      {!chosenAircraft && (
        <Box mt={3}>
          <AviaInput
            title="Aircraft registration"
            value={aircraftValue}
            setValue={setAircraftValue}
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
        </Box>
      )}
      {aircrafts && !chosenAircraft && (
        <Box display="flex" overflow="auto">
          {aircrafts.map((aircraft, index) => (
            <Box
              key={aircraft.id + index}
              mr={1}
              ml={index === 0 ? 1 : undefined}
            >
              <AircraftCard
                data={aircraft}
                onClick={() => chooseAircraft(aircraft.id)}
              />
            </Box>
          ))}
        </Box>
      )}
      {chosenAircraft && (
        <AircraftCard
          data={chosenAircraft}
          onClick={clearChosenAircraft}
          chosen
        />
      )}
    </Box>
  );
};

export default BaseAircraftForm;
