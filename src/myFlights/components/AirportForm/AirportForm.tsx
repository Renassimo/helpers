import { useState, KeyboardEvent, useEffect } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LabelIcon from '@mui/icons-material/Label';
import TitleIcon from '@mui/icons-material/Title';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import useInputValue from '@/common/hooks/useInputValue';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import AirportCard from '@/myFlights/components/AirportCard';

import AviaInput from '@/avia/components/AviaInput';

import useAlerts from '@/common/hooks/alerts/useAlerts';
import geoLocation from '@/common/utils/geoLocation';

const AirportForm = ({ title }: { title: 'Origin' | 'Destination' }) => {
  const { createErrorAlert } = useAlerts();

  const key = title === 'Origin' ? 'originsResult' : 'destinationsResult';
  const {
    [key]: {
      airports,
      chosenAirport,
      retreiveAirports,
      chooseAirport,
      clearChosenAirport,
      loading,
    },
  } = useMyFlightsContext();

  const [airportValue, setAirportValue] = useInputValue<string>('');
  const [by, setBy] = useState<'code' | 'text' | 'location'>('code');
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (airportValue.length > 4 && by === 'code') setBy('text');
  }, [airportValue]);

  const searchByLocation = async () => {
    setLocationLoading(true);
    geoLocation(
      async (args) =>
        await retreiveAirports({
          lat: String(args.coords.latitude),
          lon: String(args.coords.longitude),
        }),
      ({ message }) => createErrorAlert(message),
      createErrorAlert,
      () => {
        setAirportValue('');
        setBy('location');
      }
    );
    setLocationLoading(false);
  };

  const searchByCode = async () => {
    setBy('code');
    await retreiveAirports({
      code: airportValue,
    });
  };

  const searchByText = async () => {
    setBy('text');
    await retreiveAirports({
      text: airportValue,
    });
  };

  const onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (airportValue.length > 4) {
        searchByText();
      } else if (airportValue.length > 2) {
        searchByCode();
      }
    }
  };

  const inputDisabled = loading || locationLoading;
  const textingDisabled = inputDisabled || airportValue.length < 3;

  return (
    <Box mb={1}>
      {!chosenAirport && (
        <AviaInput
          title={title}
          placeholder={`${title} IATA or ICAO code`}
          label={title}
          value={airportValue}
          setValue={setAirportValue}
          disabled={inputDisabled}
          onKeyDown={onEnter}
          adornments={
            <>
              <IconButton
                size="small"
                color={by === 'code' ? 'primary' : undefined}
                onClick={searchByCode}
                disabled={textingDisabled}
                aria-label="By Code"
              >
                <LabelIcon />
              </IconButton>
              <IconButton
                size="small"
                color={by === 'text' ? 'primary' : undefined}
                onClick={searchByText}
                disabled={textingDisabled}
                aria-label="By Text"
              >
                <TitleIcon />
              </IconButton>
              <IconButton
                size="small"
                color={by === 'location' ? 'primary' : undefined}
                onClick={searchByLocation}
                disabled={inputDisabled}
                aria-label="By Location"
              >
                <MyLocationIcon />
              </IconButton>
            </>
          }
        />
      )}
      {airports && !chosenAirport && (
        <Box display="flex" overflow="auto">
          {airports.map((airport, index) => (
            <Box
              key={airport.id + index}
              mr={1}
              ml={index === 0 ? 1 : undefined}
            >
              <AirportCard
                data={airport}
                onClick={() => chooseAirport(airport.id)}
              />
            </Box>
          ))}
        </Box>
      )}
      {chosenAirport && (
        <AirportCard
          data={chosenAirport}
          onClick={clearChosenAirport}
          title={title}
          chosen
        />
      )}
    </Box>
  );
};

export default AirportForm;
