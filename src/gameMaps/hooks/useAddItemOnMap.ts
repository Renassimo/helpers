import { useCallback, useEffect, useMemo, useState } from 'react';

import useAlerts from '@/common/hooks/alerts';

import renderSaveMarkerPopupContent from '@/common/lib/leaflet/utils/renderSaveMarkerPopupContent';

import { CategoriesState, ItemData, ItemMarker } from '@/gameMaps/types';
import { LeafletMouseEvent } from 'leaflet';

const useAddItemOnMap = ({
  categories,
  pointingCategoryId,
  visibleItems,
}: {
  categories: CategoriesState;
  pointingCategoryId: string | null;
  visibleItems: ItemData[];
}): {
  allMarkers: (ItemData | ItemMarker | null)[];
  handleMapClick: (event: LeafletMouseEvent) => void;
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

  const renderCreateItemPopupContent = useCallback(
    () =>
      renderSaveMarkerPopupContent({
        text: `Add new ${
          pointingCategoryId
            ? categories[pointingCategoryId].attributes.title
            : ''
        } item?`,
        onAdd: () => console.log('Add'),
        onCancel: deleteNewMarker,
      }),
    [categories, pointingCategoryId]
  );

  const handleMapClick = useCallback(
    (event: LeafletMouseEvent) => {
      if (!pointingCategoryId) return;

      const { lat, lng } = event.latlng;

      setNewMarker({
        attributes: {
          coordinates: [lat, lng],
          description: renderCreateItemPopupContent(),
          categoryId: pointingCategoryId,
        },
      });
      clearAll();
      createInfoAlert(renderCreateItemPopupContent(), 0);
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

  return { allMarkers, handleMapClick };
};

export default useAddItemOnMap;
