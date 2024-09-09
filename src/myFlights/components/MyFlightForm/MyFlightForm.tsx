import { useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';

import { MyFlightAttributes } from '@/myFlights/types';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import useInputValue from '@/common/hooks/useInputValue';

import MyFlightFormField from './components/MyFlightFormField';
import getFormFieldsSchema from './utils/getFormFieldsSchema';
import MyFlightFormFieldProps from './types';

const MyFlightForm = () => {
  const { options, matchers, loadedValues } = useMyFlightsContext();

  const [state, setState] = useInputValue<Partial<MyFlightAttributes>>({});
  const setValue = (key: string, value: string | number | null) => {
    setState((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      date: loadedValues.date,
      flightNumber: loadedValues.flightNumber,
      registration: loadedValues.registration,
      cn: loadedValues.cn,
      firstFlight: loadedValues.firstFlight,
      airplaneName: loadedValues.airplaneName,
      originName: loadedValues.originName,
      destinationName: loadedValues.destinationName,
      seatNumber: loadedValues.seatNumber,
      altAirline: loadedValues.altAirline,
      altFlightNumber: loadedValues.altFlightNumber,
      planespottersUrl: loadedValues.planespottersUrl,
      distance: loadedValues.distance,
      age: loadedValues.age,
      photoUrl: loadedValues.photoUrl,
    }));
  }, [loadedValues]);

  const formFields: MyFlightFormFieldProps[] = useMemo(
    () => getFormFieldsSchema(matchers, options),
    [matchers, options]
  );

  return (
    <Box>
      {formFields.map((field) => (
        <Box key={field.name} mt={1}>
          <MyFlightFormField
            {...field}
            state={state}
            setValue={setValue}
            loadedValues={loadedValues}
          />
        </Box>
      ))}
    </Box>
  );
};

export default MyFlightForm;
