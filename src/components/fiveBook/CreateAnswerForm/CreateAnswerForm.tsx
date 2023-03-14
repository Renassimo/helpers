import { ChangeEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';
import useUpdateAnswers from '@/hooks/fiveBook/useUpdateAnswers';

import { getTurboModeAnswers } from '@/utils/fiveBook';

const CreateAnswerForm = () => {
  const { yearOptions, nextFiveBookDayCode, currentYear } = useFiveBook();
  const { update, loading } = useUpdateAnswers();

  const [year, setYear] = useState(currentYear);
  const [answer, setAnswer] = useState('');
  const [isTurboMode, setIsTurboMode] = useState(false);

  const { push } = useRouter();

  const onSubmit = useCallback(async () => {
    if (isTurboMode) {
      await update(getTurboModeAnswers(answer, yearOptions, String(year)));
      await push(`/5book/${nextFiveBookDayCode}`);
    } else {
      await update({ [String(year)]: answer });
    }
    setAnswer('');
  }, [
    answer,
    isTurboMode,
    nextFiveBookDayCode,
    push,
    update,
    year,
    yearOptions,
  ]);

  const onTurboModeChanged = useCallback(
    () => setIsTurboMode((current) => !current),
    [setIsTurboMode]
  );

  const onYearChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setYear(event.target.value),
    [setYear]
  );

  const onAnswerChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setAnswer(event.target.value),
    [setAnswer]
  );

  return (
    <Box mx={2}>
      <TextField
        select
        label="Year"
        fullWidth
        margin="dense"
        value={year}
        onChange={onYearChanged}
      >
        {yearOptions?.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        multiline
        rows={4}
        label="Answer"
        fullWidth
        margin="dense"
        value={answer}
        onChange={onAnswerChanged}
        autoFocus
      />
      <LoadingButton
        variant="outlined"
        fullWidth
        onClick={onSubmit}
        loading={loading}
        disabled={!answer}
      >
        Save
      </LoadingButton>
      <FormGroup>
        <FormControlLabel
          control={<Switch />}
          label="Turbo mode"
          checked={isTurboMode}
          onChange={onTurboModeChanged}
        />
      </FormGroup>
    </Box>
  );
};

export default CreateAnswerForm;
