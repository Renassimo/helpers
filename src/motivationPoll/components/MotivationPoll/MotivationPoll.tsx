import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';

import PollForm from '@/motivationPoll/components/PollForm';
import Results from '@/motivationPoll/components/Results';

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
