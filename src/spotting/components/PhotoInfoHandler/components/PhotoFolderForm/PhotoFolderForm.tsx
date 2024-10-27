import { useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BaseAircraftForm from '@/avia/components/BaseAircraftForm';
import BaseAirportForm from '@/avia/components/BaseAirportForm';

import useAircrafts from '@/avia/hooks/useAircrafts';
import useAirports from '@/avia/hooks/useAirports';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';
import useLoadedValues from '@/spotting/providers/hooks/usePhotoInfoProvider/useLoadedValues';

import PhotoFolderInfoForm from '../PhotoFolderInfoForm';

const PhotoFolderForm = () => {
  const { place: placeCommon, showingFolder } = usePhotoInfoContext();
  const [place, setPlace] = useState(placeCommon);

  const date = useMemo(
    () =>
      Object.values(showingFolder?.photos ?? {}).find((photo) => photo.date)
        ?.date || null,
    [showingFolder?.photos]
  );

  // Aircrafs
  const aircraftsResult = useAircrafts();

  // Airports
  const airportsResult = useAirports();
  const { chosenAirport } = airportsResult;

  useEffect(() => {
    if (chosenAirport) setPlace(chosenAirport.attributes.airportCode);
  }, [chosenAirport]);

  const { loadedValues } = useLoadedValues({ aircraftsResult, place, date });

  return (
    <Box>
      <BaseAircraftForm aircraftsResult={aircraftsResult} />
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
