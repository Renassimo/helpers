import { useCallback, useEffect, useMemo, useState } from 'react';

import useAlerts from '@/common/hooks/alerts';

import renderSaveMarkerPopupContent from '@/common/lib/leaflet/utils/renderSaveMarkerPopupContent';

import { CategoriesState, ItemData, ItemMarker } from '@/gameMaps/types';
import { LeafletMouseEvent } from 'leaflet';

const useAddItemOnMap = ({
  categories,
  pointingCategoryId,
  visibleItems,
  onAdd,
}: {
  categories: CategoriesState;
  pointingCategoryId: string | null;
  visibleItems: ItemData[];
  onAdd: (coordinates: [number, number]) => void;
}): {
  allMarkers: (ItemData | ItemMarker | null)[];
  handleMapClick: (event: LeafletMouseEvent) => void;
  newMarker: ItemMarker | null;
} => {
  const [newMarker, setNewMarker] = useState<ItemMarker | null>(null);
  const allMarkers = useMemo(
    () => [...(visibleItems ?? []), newMarker],
    [visibleItems, newMarker]
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

  const handleMapClick = useCallback(
    (event: LeafletMouseEvent) => {
      if (!pointingCategoryId) return;

      const { lat, lng } = event.latlng;
      const coordinates: [number, number] = [lat, lng];

      setNewMarker({
        attributes: {
          coordinates,
          description: renderCreateItemPopupContent(coordinates),
          categoryId: pointingCategoryId,
        },
      });
      clearAll();
      createInfoAlert(renderCreateItemPopupContent(coordinates), 0);
    },
    [pointingCategoryId]
  );

  useEffect(() => {
    if (pointingCategoryId) {
      clearAll();
      createInfoAlert(
        `Point on map to create a new ${categories[pointingCategoryId].attributes.title} item`,
        0
      );
    }
  }, [categories, pointingCategoryId]);

  useEffect(() => {
    if (!pointingCategoryId) deleteNewMarker();
  }, [pointingCategoryId]);

  return { allMarkers, handleMapClick, newMarker };
};

export default useAddItemOnMap;
