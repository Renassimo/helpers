import { useCallback, useEffect, useState } from 'react';

import useAlerts from '@/common/hooks/alerts';

import renderSaveMarkerPopupContent from '@/common/lib/leaflet/utils/renderSaveMarkerPopupContent';

import { CategoriesState, ItemData, ItemMarker } from '@/gameMaps/types';
import { LeafletMouseEvent } from 'leaflet';

const useAddItemOnMap = ({
  categories,
  pointingCategoryId,
  onAdd,
  relocatingItem,
  updateItemCoordinates,
}: {
  categories: CategoriesState;
  pointingCategoryId: string | null;
  onAdd: (coordinates: [number, number]) => void;
  relocatingItem: ItemData | null;
  updateItemCoordinates: (coordinates: [number, number]) => void;
}): {
  handleMapClick: (event: LeafletMouseEvent) => void;
  newMarker: ItemMarker | null;
  relocatingMarker: ItemMarker | null;
} => {
  const [newMarker, setNewMarker] = useState<ItemMarker | null>(null);
  const [relocatingMarker, setRelocatingMarker] = useState<ItemMarker | null>(
    null
  );

  const { createInfoAlert, clearAll } = useAlerts();

  const deleteNewMarker = useCallback(() => {
    clearAll();
    setNewMarker(null);
  }, []);

  const openCreateNewItem = useCallback((coordinates: [number, number]) => {
    clearAll();
    onAdd(coordinates);
  }, []);

  const renderCreateItemPopupContent = useCallback(
    (coordinates: [number, number]) =>
      renderSaveMarkerPopupContent({
        text: `Add new ${
          pointingCategoryId
            ? categories[pointingCategoryId].attributes.title
            : ''
        } item?`,
        onAdd: () => openCreateNewItem(coordinates),
        onCancel: deleteNewMarker,
      }),
    [categories, pointingCategoryId]
  );

  const renderRelocateItemPopupContent = useCallback(
    (coordinates: [number, number], categoryTitle: string) => {
      return renderSaveMarkerPopupContent({
        text: `Relocate ${categoryTitle} item?`,
        onAdd: async () => {
          await updateItemCoordinates(coordinates);
          setNewMarker(null);
        },
        onCancel: deleteNewMarker,
      });
    },
    [categories, pointingCategoryId, newMarker, updateItemCoordinates]
  );

  const handleMapClick = useCallback(
    (event: LeafletMouseEvent) => {
      if (!pointingCategoryId && !relocatingItem) return;

      const { lat, lng } = event.latlng;
      const coordinates: [number, number] = [lat, lng];

      if (pointingCategoryId) {
        setNewMarker({
          attributes: {
            coordinates,
            description: renderCreateItemPopupContent(coordinates),
            categoryId: pointingCategoryId,
          },
        });
        clearAll();
        createInfoAlert(renderCreateItemPopupContent(coordinates), 0);
      } else if (relocatingItem) {
        const popupContent = renderRelocateItemPopupContent(
          coordinates,
          categories[relocatingItem.attributes.categoryId].attributes.title ??
            ''
        );
        setRelocatingMarker({
          id: relocatingItem.id,
          attributes: {
            coordinates,
            description: popupContent,
            categoryId: relocatingItem.attributes.categoryId,
          },
        });
        clearAll();
        createInfoAlert(popupContent, 0);
      }
    },
    [pointingCategoryId, relocatingItem, renderRelocateItemPopupContent]
  );

  useEffect(() => {
    if (pointingCategoryId) {
      clearAll();
      createInfoAlert(
        `Point on map to create a new ${categories[pointingCategoryId].attributes.title} item`,
        0
      );
    } else {
      setNewMarker(null);
    }
  }, [categories, pointingCategoryId]);

  useEffect(() => {
    if (!pointingCategoryId) deleteNewMarker();
  }, [pointingCategoryId]);

  useEffect(() => {
    if (relocatingItem) {
      clearAll();
      createInfoAlert(
        `Point on map to change ${
          categories[relocatingItem.attributes.categoryId].attributes.title
        } item coordinates`,
        0
      );
    } else {
      setRelocatingMarker(null);
    }
  }, [relocatingItem, categories]);

  return { handleMapClick, newMarker, relocatingMarker };
};

export default useAddItemOnMap;
