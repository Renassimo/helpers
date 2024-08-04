import { LatLngBounds, LatLngTuple } from 'leaflet';

const getMapBoundsAndCenter = (props?: {
  zero?: number;
  yRange?: number;
  xRange?: number;
  offset?: number;
}): { center: LatLngTuple; bounds: LatLngBounds } => {
  const { zero = 0, yRange = 1, xRange = 1, offset = 10 } = props ?? {};

  const leftBottomLat = zero;
  const leftBottomLng = zero + offset;
  const rightTopLat = leftBottomLat + yRange;
  const rightTopLng = leftBottomLng + xRange;

  const leftBottomCorner = [leftBottomLat, leftBottomLng] as LatLngTuple;
  const rightTopCorner = [rightTopLat, rightTopLng] as LatLngTuple;

  const centerLat = leftBottomLat + (rightTopLat - leftBottomLat) / 2;
  const centerLng = leftBottomLng + (rightTopLng - leftBottomLng) / 2;
  const center = [centerLat, centerLng] as LatLngTuple;

  const bounds = new LatLngBounds(leftBottomCorner, rightTopCorner);

  return { center, bounds };
};

export default getMapBoundsAndCenter;
