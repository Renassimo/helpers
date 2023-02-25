import { ReactNode } from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const FiveBookCard = ({ children }: { children: ReactNode }) => {
  return (
    <Paper>
      <Box p={2} height="85vh" sx={{ maxHeight: '85vh', overflow: 'auto' }}>
        {children}
      </Box>
    </Paper>
  );
};

export default FiveBookCard;
