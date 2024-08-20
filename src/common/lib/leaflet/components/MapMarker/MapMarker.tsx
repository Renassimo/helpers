import { Marker, Popup, Tooltip } from 'react-leaflet';
import { ReactNode } from 'react';

import getMarkerIcon from '../../utils/getMarkerIcon';

const MapMarker = ({
  color,
  position,
  isNew = false,
  isMarked = false,
  children,
  title,
}: {
  color: string;
  position: [number, number];
  isNew?: boolean;
  isMarked?: boolean;
  children?: ReactNode;
  title?: string;
}) => {
  return (
    <>
      <Marker position={position} icon={getMarkerIcon(color, isNew, isMarked)}>
        {title && (
          <Tooltip direction="top" offset={[0, -45]}>
            {title}
          </Tooltip>
        )}
        {children && <Popup>{children}</Popup>}
      </Marker>
    </>
  );
};

export default MapMarker;
