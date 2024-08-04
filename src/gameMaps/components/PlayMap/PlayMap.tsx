import { MouseEvent } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

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
    relocateItem,
    relocatingItem,
    updateItemCoordinates,
  } = usePlay();
  const { handleMapClick, newMarker, relocatingMarker } = useAddItemOnMap({
    categories,
    pointingCategoryId,
    onAdd: openItemCreating,
    relocatingItem,
    updateItemCoordinates,
  });

  const { mapImageUrl, backgroundColor, mapImageRatio } =
    game?.attributes ?? {};

  const handleEditItem = (event: MouseEvent, id?: string) => {
    event.stopPropagation();
    if (id) openItemUpdating(id);
  };

  const handleRelocateItem = (event: MouseEvent, id?: string) => {
    event.stopPropagation();
    if (id) relocateItem(id);
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
        mapImageRatio={mapImageRatio}
        backgroundColor={backgroundColor}
      >
        {visibleItems.map((item) => (
          <MapMarker
            key={item.id}
            position={item.attributes.coordinates}
            color={categories[item.attributes.categoryId]?.attributes.color}
            isMarked={!!item.attributes.collected}
          >
            {
              <Box>
                <Box>
                  <Typography>{item.attributes.description}</Typography>
                </Box>
                <Box textAlign="right">
                  <IconButton
                    aria-label="edit-coordinates"
                    size="small"
                    onClick={(event) => handleRelocateItem(event, item.id)}
                  >
                    <EditLocationAltIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit-item"
                    size="small"
                    onClick={(event) => handleEditItem(event, item.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            }
          </MapMarker>
        ))}
        {newMarker && (
          <MapMarker
            key={newMarker.id}
            position={newMarker.attributes.coordinates}
            color={
              categories[newMarker.attributes.categoryId]?.attributes.color
            }
            isNew
          >
            {newMarker.attributes.description}
          </MapMarker>
        )}
        {relocatingMarker && (
          <MapMarker
            key={relocatingMarker.id}
            position={relocatingMarker.attributes.coordinates}
            color={
              categories[relocatingMarker.attributes.categoryId]?.attributes
                .color
            }
            isNew
          >
            {relocatingMarker.attributes.description}
          </MapMarker>
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
