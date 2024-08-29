import { useState } from 'react';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MyFlightsTable from '@/myFlights/components/MyFlightsTable';
import MyFlightFormModal from '@/myFlights/components/MyFlightFormModal';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import { MyFlightData } from '@/myFlights/types';

const MyFlights = () => {
  const { options } = useMyFlightsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (newData: MyFlightData | null) => console.log(newData);

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
            onClick={() => setIsModalOpen(true)}
          >
            <AddIcon />
          </IconButton>
        )}
      </Typography>
      <MyFlightsTable />
      <MyFlightFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onFinish={onFinish}
      />
    </>
  );
};

export default MyFlights;
