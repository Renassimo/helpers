import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MyFlightsTable from '@/myFlights/components/MyFlightsTable';
import MyFlightFormModal from '@/myFlights/components/MyFlightFormModal';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

const MyFlights = () => {
  const {
    options,
    myFlightForm: { openModal },
  } = useMyFlightsContext();
  const addFlight = () => openModal();

  return (
    <>
      <Typography
        component="h1"
        variant="h6"
        mt={1}
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        My Flights
        {options && (
          <IconButton
            aria-label="Add flight"
            sx={{ paddingY: 0 }}
            onClick={addFlight}
          >
            <AddIcon />
          </IconButton>
        )}
      </Typography>
      <MyFlightsTable />
      <MyFlightFormModal />
    </>
  );
};

export default MyFlights;
