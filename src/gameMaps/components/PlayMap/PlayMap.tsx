import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';

import MapOnImage from '@/common/lib/leaflet/components/MapOnImage';
import MapMarker from '@/common/lib/leaflet/components/MapMarker';
import ItemFormModal from '@/gameMaps/components/ItemFormModal';

import usePlay from '@/gameMaps/hooks/usePlay';
import useAddItemOnMap from '@/gameMaps/hooks/useAddItemOnMap';

const PlayMap = () => {
  const {
    game,
    play,
    visibleItems,
    items,
    categories,
    pointingCategoryId,
    openItemCreating,
    openItemUpdating,
    isItemEditOpen,
    setIsItemEditOpen,
    updateSubmittedItem,
    editingItem,
  } = usePlay();
  const { allMarkers, handleMapClick, newMarker } = useAddItemOnMap({
    categories,
    pointingCategoryId,
    visibleItems,
    onAdd: openItemCreating,
  });

  const { mapImageUrl, backgroundColor } = game?.attributes ?? {};

  const handleEditItem = (id?: string) => {
    if (id) openItemUpdating(id);
  };

  const gameId = game?.id;
  const categoryId =
    pointingCategoryId ||
    (editingItem && items[editingItem?.id].attributes.categoryId);
  const playId = play?.id;

  const { coordinates: newMarkerCoordinates } = newMarker?.attributes ?? {};
  const { coordinates: editingItemCoordinates } = editingItem?.attributes ?? {};
  const coordinates = newMarkerCoordinates || editingItemCoordinates;

  const isItemModalAllowed = !!(gameId && categoryId && playId && coordinates);

  return (
    <>
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
                color={
                  categories[marker.attributes.categoryId]?.attributes.color
                }
                isNew={!marker.id}
                isMarked={!!marker.attributes.collected}
              >
                {marker.id ? (
                  <Box>
                    <Box>
                      <Typography>{marker.attributes.description}</Typography>
                    </Box>
                    <Box textAlign="right">
                      <IconButton
                        aria-label="edit-item"
                        size="small"
                        onClick={() => handleEditItem(marker.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ) : (
                  marker.attributes.description
                )}
              </MapMarker>
            )
        )}
      </MapOnImage>
      {isItemModalAllowed && (
        <ItemFormModal
          isModalOpen={isItemEditOpen}
          setIsModalOpen={setIsItemEditOpen}
          onFinish={updateSubmittedItem}
          gameId={gameId}
          categoryId={categoryId}
          playId={playId}
          coordinates={coordinates}
          data={editingItem}
        />
      )}
    </>
  );
};

export default PlayMap;
