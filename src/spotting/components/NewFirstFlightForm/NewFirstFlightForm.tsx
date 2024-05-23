import React, { ChangeEvent } from 'react';

import { formatToNotionDate } from '@/common/utils/dayjs';

import useSpottedPlanes from '@/spotting/hooks/useSpottedPlanes';

import TextField from '@mui/material/TextField';

const NewFirstFlightForm = ({
  id,
  disabled = false,
}: {
  id: string;
  disabled?: boolean;
}) => {
  const { updateNewFirstFlight } = useSpottedPlanes();

  const newFirstFlightInputName = `new-first-flight-${id}`;

  const onNewFirstFlightChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateNewFirstFlight(id, formatToNotionDate(event.target.value));
  };

  return (
    <TextField
      id={newFirstFlightInputName}
      name={newFirstFlightInputName}
      onChange={onNewFirstFlightChange}
      placeholder={'First flight (1 Sep 1999)'}
      disabled={disabled}
      fullWidth
      margin="dense"
      variant="standard"
    />
  );
};

export default NewFirstFlightForm;
