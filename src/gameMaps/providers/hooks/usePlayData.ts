import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import useAlerts from '@/common/hooks/alerts';

import { getAttributeObjectFromArray } from '@/common/utils/data';

import {
  CategoryData,
  GameData,
  ItemData,
  PlayContextData,
  PlayData,
  PlayPageData,
} from '@/gameMaps/types';

const usePlayData = (data: PlayPageData | null): PlayContextData => {
  const { createSuccessAlert } = useAlerts();
  const { push } = useRouter();

  const {
    gameData = null,
    playData = null,
    categoriesData = [],
    itemsData = [],
  } = data ?? {};

  const [game] = useState<GameData | null>(gameData);
  const [play, setPlay] = useState<PlayData | null>(playData);
  const [categories] = useState(getAttributeObjectFromArray(categoriesData));
  const [items] = useState(getAttributeObjectFromArray(itemsData));
  const categoriesList: CategoryData[] = useMemo(
    () => Object.values(categories),
    [categories]
  );
  const itemsList: ItemData[] = useMemo(() => Object.values(items), [items]);

  const [isPlayEditOpen, setIsPlayEditOpen] = useState<boolean>(false);

  const parentPageHref = `/gameMaps/games/${game?.id}`;

  const updateSubmittedPlay = (newData: PlayData | null) => {
    if (newData == null) {
      setPlay(null);
      push(parentPageHref);
      createSuccessAlert(`Play was deleted!`);
    } else {
      createSuccessAlert(`"${newData.attributes.title}" play was updated!`);
      setPlay(newData);
    }
  };

  return {
    game,
    play,
    updateSubmittedPlay,
    isPlayEditOpen,
    setIsPlayEditOpen,
    categories: categoriesList,
    items: itemsList,
  };
};

export default usePlayData;
