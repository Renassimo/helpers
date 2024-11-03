import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import { Avia } from '@/avia/types/avia';
import { MyFlightAttributes } from '@/myFlights/types';

import AviaFormField from '@/avia/components/AviaFormField';

import getFormFieldsSchema from './utils/getFormFieldsSchema';

const MyFlightFormField = AviaFormField<MyFlightAttributes>;

const MyFlightForm = () => {
  const { options, matchers, loadedValues, myFlightForm } =
    useMyFlightsContext();
  const { state, setValue, isEditing, loading, onDelete } = myFlightForm;

  const formFields: Avia.FormFieldProps<MyFlightAttributes>[] = useMemo(
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
      {isEditing && (
        <Box mt={2}>
          <Button
            fullWidth
            type="button"
            color="error"
            variant="outlined"
            disabled={loading}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MyFlightForm;
