import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const StarterForm = () => {
  const { startTest } = useMotivationPoll();
  return (
    <Box textAlign="center">
      <Button type="button" variant="outlined" size="large" onClick={startTest}>
        Start
      </Button>
    </Box>
  );
};

export default StarterForm;
