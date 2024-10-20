import useAircrafts from '@/avia/hooks/useAircrafts';
import useAirports from '@/avia/hooks/useAirports';
import { Box } from '@mui/material';

const PhotoFolderForm = () => {
  // Aircrafs
  const aircraftsResult = useAircrafts();

  // Airports
  const airportsResult = useAirports();

  console.log({ aircraftsResult, airportsResult });

  return <Box></Box>;
};

export default PhotoFolderForm;
