import { MapContainer, ImageOverlay, ZoomControl } from 'react-leaflet';

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
  mapImageRatio,
  children,
}: {
  onClick: (event: LeafletMouseEvent) => void;
  mapImageUrl?: string;
  backgroundColor?: string;
  mapImageRatio?: number | null;
  children: ReactNode;
}) => {
  const yRange = mapImageRatio ? 1 / mapImageRatio : 1;
  const { center, bounds } = getMapBoundsAndCenter({ yRange });

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
          zoomControl={false}
        >
          <ImageOverlay
            url={mapImageUrl}
            bounds={bounds}
            opacity={1}
            zIndex={10}
          />
          <ZoomControl position="bottomleft" />
          <MapEventsHandler handleMapClick={onClick} />
          {children}
        </MapContainer>
      )}
    </Box>
  );
};

export default MapOnImage;
