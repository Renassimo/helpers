import { ChangeEvent, useCallback } from 'react';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const FinishForm = () => {
  const { name, setName, prepareResults } = useMotivationPoll();

  const onNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setName(event.target.value),
    [setName]
  );

  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography component="h1" variant="h5" textAlign="center" m={2}>
        Type you name an get your results
      </Typography>
      <Box
        maxWidth="500px"
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap="8px"
      >
        <TextField name="name" value={name || ''} onChange={onNameChange} />
        <Button
          disabled={!name}
          type="button"
          variant="outlined"
          size="large"
          onClick={prepareResults}
        >
          Get Results
        </Button>
      </Box>
    </Box>
  );
};

export default FinishForm;
