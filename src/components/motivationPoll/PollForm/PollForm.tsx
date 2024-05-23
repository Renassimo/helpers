import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Description from '@/components/motivationPoll/Description';
import StarterForm from '@/components/motivationPoll/StarterForm';
import QuestionForm from '@/components/motivationPoll/QuestionForm';
import FinishForm from '@/components/motivationPoll/FinishForm';

import Box from '@mui/material/Box';

const PollForm = () => {
  const { isStarted, isFinished, currentQuestion } = useMotivationPoll();

  return (
    <Box>
      {!isFinished && <Description />}
      {!isStarted && <StarterForm />}
      {currentQuestion && <QuestionForm />}
      {isFinished && <FinishForm />}
    </Box>
  );
};

export default PollForm;
