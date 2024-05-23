import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import FiveBookCard from '@/fiveBook/components/FiveBookCard';
import DatePicker from '@/fiveBook/components/DatePicker';
import CreateAnswerForm from '@/fiveBook/components/CreateAnswerForm';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';

const CreateAnswerCard = () => {
  const { fiveBookDayText, emoji } = useFiveBook();

  const theme = useTheme();
  const isLowerThanMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <FiveBookCard>
      <Typography component="h1" variant="h5" textAlign="center" m={2}>
        {fiveBookDayText} {emoji}
      </Typography>
      {!isLowerThanMd && (
        <Box mt={2}>
          <DatePicker staticPicker />
        </Box>
      )}
      <CreateAnswerForm />
    </FiveBookCard>
  );
};

export default CreateAnswerCard;
