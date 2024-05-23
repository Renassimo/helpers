import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import ResultsTable from '@/motivationPoll/components/ResultsTable';
import ResultsChart from '@/motivationPoll/components/ResultsChart';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Results = ({ onDownloadPdf }: { onDownloadPdf: () => void }) => {
  const { name } = useMotivationPoll();
  return (
    <Box>
      <Typography component="h1" variant="h5" textAlign="center" my={2}>
        Motivation Test Results for {name}:{' '}
        <Button onClick={onDownloadPdf}>Save as PDF</Button>
      </Typography>
      <ResultsTable />
      <ResultsChart />
    </Box>
  );
};

export default Results;
