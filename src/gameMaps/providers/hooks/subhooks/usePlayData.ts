import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import useAlerts from '@/common/hooks/alerts';

import { GameData, PlayData } from '@/gameMaps/types';

const usePlayData = (
  game: GameData | null,
  playData: PlayData | null
): {
  play: PlayData | null;
  updateSubmittedPlay: (newData: PlayData | null) => void;
  isPlayEditOpen: boolean;
  setIsPlayEditOpen: (newState: boolean) => void;
} => {
  const { createSuccessAlert } = useAlerts();
  const { push } = useRouter();

  const [play, setPlay] = useState<PlayData | null>(playData);

  const [isPlayEditOpen, setIsPlayEditOpen] = useState<boolean>(false);

  const updateSubmittedPlay = useCallback((newData: PlayData | null) => {
    if (newData == null) {
      setPlay(null);
      push(`/gameMaps/games/${game?.id}`);
      createSuccessAlert(`Play was deleted!`);
    } else {
      createSuccessAlert(`"${newData.attributes.title}" play was updated!`);
      setPlay(newData);
    }
  }, []);

  return {
    play,
    updateSubmittedPlay,
    isPlayEditOpen,
    setIsPlayEditOpen,
  };
};

export default usePlayData;
