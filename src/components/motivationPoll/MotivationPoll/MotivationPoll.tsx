import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import PollForm from '@/components/motivationPoll/PollForm';
import Results from '@/components/motivationPoll/Results';

import Box from '@mui/material/Box';

const MotivationPoll = ({ onDownloadPdf }: { onDownloadPdf: () => void }) => {
  const { results } = useMotivationPoll();
  return (
    <Box>
      {results ? <Results onDownloadPdf={onDownloadPdf} /> : <PollForm />}
    </Box>
  );
};

export default MotivationPoll;
