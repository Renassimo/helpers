import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BaseAircraftForm from '@/avia/components/BaseAircraftForm';
import BaseAirportForm from '@/avia/components/BaseAirportForm';
import PhotoFolderInfoForm from '../PhotoFolderInfoForm';
import FlownResult from '../FlownResult';

import useAircrafts from '@/avia/hooks/useAircrafts';
import useAirports from '@/avia/hooks/useAirports';
import usePhotoFolderInfoForm from './hooks/usePhotoFolderInfoForm';

const PhotoFolderForm = () => {
  // Aircrafs
  const aircraftsResult = useAircrafts();
  // Airports
  const airportsResult = useAirports();

  const { loadedValues, setFlown, placeCommon } = usePhotoFolderInfoForm({
    aircraftsResult,
    airportsResult,
  });

  return (
    <Box>
      <BaseAircraftForm aircraftsResult={aircraftsResult} />
      <FlownResult aircraftsResult={aircraftsResult} onClick={setFlown} />
      {!placeCommon && (
        <BaseAirportForm title="Airport" airportsResult={airportsResult} />
      )}
      <Typography variant="subtitle2" mt={2}>
        Enter fields mannually
      </Typography>
      <PhotoFolderInfoForm loadedValues={loadedValues} />
    </Box>
  );
};

export default PhotoFolderForm;
