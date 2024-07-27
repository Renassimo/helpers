import { DivIcon } from 'leaflet';
import invert from 'invert-color';

const getMarkerIcon = (color = '#ffffff', isNew = false) =>
  new DivIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" data-name="Map Pin" viewBox="0 0 128 160" x="0px" y="0px">
	<title>Map Pin</title>
	<path opacity="${isNew ? 0.1 : 1}" fill="${invert(
      color,
      true
    )}" d="M 64 2 C 41.91 2 24 19.08 24 40.15 S 64 126 64 126 s 40 -64.77 40 -85.85 S 86.09 2 64 2 Z Z"/>
	<path opacity="${
    isNew ? 0.55 : 1
  }" fill="${color}" d="M 64.04 3.62 C 42.8336 3.62 25.64 20.0168 25.64 40.244 S 64.04 122.66 64.04 122.66 s 38.4 -62.1792 38.4 -82.416 S 85.2464 3.62 64.04 3.62 Z Z"/>
</svg>`,
    className: 'marker',
    iconSize: [48, 60],
    iconAnchor: [24, 46.5],
  });

export default getMarkerIcon;
