import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Description from '@/motivationPoll/components/Description';
import StarterForm from '@/motivationPoll/components/StarterForm';
import QuestionForm from '@/motivationPoll/components/QuestionForm';
import FinishForm from '@/motivationPoll/components/FinishForm';

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
