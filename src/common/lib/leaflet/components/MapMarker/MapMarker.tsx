import { Marker, Popup } from 'react-leaflet';
import { ReactNode } from 'react';

import getMarkerIcon from '../../utils/getMarkerIcon';

const MapMarker = ({
  color,
  position,
  isNew = false,
  children,
}: {
  color: string;
  position: [number, number];
  isNew?: boolean;
  children?: ReactNode;
}) => {
  return (
    <>
      <Marker position={position} icon={getMarkerIcon(color, isNew)}>
        {children && <Popup>{children}</Popup>}
      </Marker>
    </>
  );
};

export default MapMarker;
