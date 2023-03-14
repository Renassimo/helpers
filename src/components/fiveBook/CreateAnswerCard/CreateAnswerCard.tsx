import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import FiveBookCard from '@/components/fiveBook/FiveBookCard';
import DatePicker from '@/components/fiveBook/DatePicker';
import CreateAnswerForm from '@/components/fiveBook/CreateAnswerForm';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';

const CreateAnswerCard = () => {
  const { fiveBookDayText } = useFiveBook();

  const theme = useTheme();
  const isLowerThanMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <FiveBookCard>
      <Typography component="h1" variant="h5" textAlign="center" m={2}>
        {fiveBookDayText}
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
