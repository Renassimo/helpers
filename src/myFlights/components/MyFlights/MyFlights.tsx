import Typography from '@mui/material/Typography';

import FlightsTable from '@/myFlights/components/FlightsTable';

const MyFlights = () => {
  return (
    <>
      <Typography component="h1" variant="h6" mt={1} textAlign="center">
        My Flights
      </Typography>
      <FlightsTable />
    </>
  );
};

export default MyFlights;
