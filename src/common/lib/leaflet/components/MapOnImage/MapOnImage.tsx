import { MapContainer, ImageOverlay } from 'react-leaflet';

import Box from '@mui/material/Box';

import MapEventsHandler from '@/common/lib/leaflet/components/MapEventsHandler';
import getMapBoundsAndCenter from '@/common/lib/leaflet/utils/getMapBoundsAndCenter';

import { ReactNode } from 'react';
import { LeafletMouseEvent } from 'leaflet';

import 'leaflet/dist/leaflet.css';

const MapOnImage = ({
  onClick,
  mapImageUrl,
  backgroundColor,
  children,
}: {
  onClick: (event: LeafletMouseEvent) => void;
  mapImageUrl?: string;
  backgroundColor?: string;
  children: ReactNode;
}) => {
  const { center, bounds } = getMapBoundsAndCenter();

  return (
    <Box width="100%" height="100%">
      {mapImageUrl && (
        <MapContainer
          center={center}
          zoom={10}
          style={{
            height: '100%',
            width: '100%',
            backgroundColor,
          }}
          attributionControl={false}
        >
          <ImageOverlay
            url={mapImageUrl}
            bounds={bounds}
            opacity={1}
            zIndex={10}
          />
          <MapEventsHandler handleMapClick={onClick} />
          {children}
        </MapContainer>
      )}
    </Box>
  );
};

export default MapOnImage;
