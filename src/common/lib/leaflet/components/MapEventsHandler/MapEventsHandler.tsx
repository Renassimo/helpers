import { useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

const MapEventsHandler = ({
  handleMapClick,
}: {
  handleMapClick: (event: LeafletMouseEvent) => void;
}) => {
  useMapEvents({
    click: handleMapClick,
  });
  return null;
};

export default MapEventsHandler;
