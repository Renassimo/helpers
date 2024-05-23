import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ResultsTable = () => {
  const { results } = useMotivationPoll();
  return (
    <Box my={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Median value</TableCell>
              <TableCell>Your result</TableCell>
            </TableRow>
          </TableHead>
          {results && (
            <TableBody>
              {results.map((demand) => (
                <TableRow key={demand.id}>
                  <TableCell>{demand.id + 1}</TableCell>
                  <TableCell>{demand.text}</TableCell>
                  <TableCell>{demand.medianValue}</TableCell>
                  <TableCell>{demand.points ?? 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsTable;
