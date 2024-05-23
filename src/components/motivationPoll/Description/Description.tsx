import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Description = () => {
  const { description } = useMotivationPoll();
  return (
    <Box>
      <Typography component="h1" variant="h4" textAlign="center" m={2}>
        Motivation Test
      </Typography>
      <Typography component="p" m={4}>
        {description}
      </Typography>
    </Box>
  );
};

export default Description;
