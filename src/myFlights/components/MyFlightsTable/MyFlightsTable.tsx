import { Fragment } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { showWhen } from '@/common/utils/dayjs';

import useThemeBreakpoints from '@/common/hooks/useThemeBreakpoints';

import useFilter from '@/common/hooks/useFilter';
import useTableCollapse from '@/common/hooks/useTableCollapse';
import useTableOrder from '@/common/hooks/useTableOrder';
import useTablePagination from '@/common/hooks/useTablePagination';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import FilterInput from '@/common/components/FilterInput';

import MyFlightCard from '@/myFlights/components/MyFlightCard';

const MyFlightsTable = () => {
  const { myFlightsList } = useMyFlightsContext();
  const {
    filterQuery,
    setFilterQuery,
    visibleItems: visibleFlights,
  } = useFilter(myFlightsList, [
    'airline',
    'manufacturer',
    'model',
    'registration',
    'origin',
    'destination',
    'originName',
    'destinationName',
    'airplaneName',
  ]);

  const {
    orderedList: orderedFlights,
    isReversedOrder,
    reverse,
  } = useTableOrder(visibleFlights, false);

  const { paginationProps, rows: paginatedAndOrderedFlights } =
    useTablePagination(orderedFlights, [10, 25, 50, 100, myFlightsList.length]);

  const [openedRowId, toggleOpenRowId] = useTableCollapse();

  const {
    down: { md: densed, sm: sDensed },
  } = useThemeBreakpoints();

  return (
    <Box my={2}>
      <Box my={1}>
        <FilterInput value={filterQuery} setValue={setFilterQuery} fullWidth />
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table
            stickyHeader
            size={densed ? 'small' : 'medium'}
            sx={sDensed ? { 'td, th': { padding: '6px' } } : {}}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={isReversedOrder}
                    direction={isReversedOrder ? 'desc' : 'asc'}
                    onClick={reverse}
                    aria-label="Reverse"
                  >
                    N
                  </TableSortLabel>
                </TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Airline</TableCell>
                {densed ? (
                  <TableCell>Route</TableCell>
                ) : (
                  <>
                    <TableCell>Origin</TableCell>
                    <TableCell>Destination</TableCell>
                  </>
                )}
                <TableCell>Aircraft</TableCell>
                {!sDensed && <TableCell>Registration</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAndOrderedFlights.map(({ id, attributes }) => (
                <Fragment key={id}>
                  <TableRow
                    sx={{
                      cursor: 'pointer',
                      ':hover': { backgroundColor: '#f5f5f5' },
                      '& > td': { borderBottom: 'unset' },
                    }}
                    onClick={() => toggleOpenRowId(id)}
                  >
                    <TableCell>{attributes.number}</TableCell>
                    <TableCell>
                      {attributes.date
                        ? showWhen(attributes.date, false)
                        : null}
                    </TableCell>
                    <TableCell>{attributes.airline}</TableCell>
                    {densed ? (
                      <TableCell>
                        {attributes.origin} {attributes.destination}
                      </TableCell>
                    ) : (
                      <>
                        <TableCell>{attributes.origin}</TableCell>
                        <TableCell>{attributes.destination}</TableCell>
                      </>
                    )}
                    <TableCell>
                      {attributes.manufacturer} {attributes.model}
                    </TableCell>
                    {!sDensed && (
                      <TableCell>{attributes.registration}</TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={7}
                    >
                      <Collapse in={openedRowId === id}>
                        <Box sx={{ margin: 1 }}>
                          <MyFlightCard data={{ id, attributes }} />
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          {...paginationProps}
          showFirstButton={!sDensed}
          showLastButton={!sDensed}
          sx={
            sDensed
              ? {
                  '.MuiTablePagination-actions': { marginLeft: '0' },
                  '.MuiInputBase-root': { marginRight: '0' },
                }
              : {}
          }
        />
      </Paper>
    </Box>
  );
};

export default MyFlightsTable;
