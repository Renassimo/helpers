import MapOnImage from '@/common/lib/leaflet/components/MapOnImage';
import MapMarker from '@/common/lib/leaflet/components/MapMarker';

import usePlay from '@/gameMaps/hooks/usePlay';
import useAddItemOnMap from '@/gameMaps/hooks/useAddItemOnMap';

const PlayMap = () => {
  const { game, visibleItems, categories, pointingCategoryId } = usePlay();
  const { allMarkers, handleMapClick } = useAddItemOnMap({
    categories,
    pointingCategoryId,
    visibleItems,
  });

  const { mapImageUrl, backgroundColor } = game?.attributes ?? {};

  return (
    <MapOnImage
      onClick={handleMapClick}
      mapImageUrl={mapImageUrl}
      backgroundColor={backgroundColor}
    >
      {allMarkers.map(
        (marker) =>
          marker && (
            <MapMarker
              key={marker.id ?? 'new-marker'}
              position={marker.attributes.coordinates}
              color={categories[marker.attributes.categoryId]?.attributes.color}
              isNew={!marker.id}
            >
              {marker.attributes.description}
            </MapMarker>
          )
      )}
    </MapOnImage>
  );
};

export default PlayMap;
