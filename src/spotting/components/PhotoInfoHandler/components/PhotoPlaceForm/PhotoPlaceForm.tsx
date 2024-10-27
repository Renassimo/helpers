import { useEffect } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { PhotoActionType } from '@/spotting/types';

import useAlerts from '@/common/hooks/alerts';
import useAirports from '@/avia/hooks/useAirports';
import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import BaseAirportForm from '@/avia/components/BaseAirportForm';

const PhotoPlaceForm = () => {
  const { dispatch, photosList } = usePhotoInfoContext();
  const airportsResult = useAirports();
  const { chosenAirport, retreiveAirports, loading } = airportsResult;

  const { createInfoAlert } = useAlerts();

  const findLocationFromPhotos = async () => {
    const { location } = photosList.find((photo) => photo.location) || {};
    if (location)
      await retreiveAirports({
        lat: String(location.lat),
        lon: String(location.lon),
      });
    else createInfoAlert("Location didn't find in photos");
  };

  useEffect(() => {
    dispatch({
      type: PhotoActionType.UPDATE_PLACE,
      payload: chosenAirport?.attributes.airportCode ?? null,
    });
  }, [chosenAirport]);

  return (
    <Box>
      <BaseAirportForm
        title="Airport"
        airportsResult={airportsResult}
        adornments={
          <IconButton
            size="small"
            onClick={findLocationFromPhotos}
            disabled={loading}
            aria-label="Find Location from Photos"
          >
            <AddAPhotoIcon />
          </IconButton>
        }
      />
    </Box>
  );
};

export default PhotoPlaceForm;
