import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';

import { PlayPageProps } from '@/gameMaps/types';
import { BreadcrumbsItem } from '@/common/types/props';

import usePlayContext from '@/gameMaps/contexts/hooks/usePlayContext';

import Play from '@/gameMaps/components/Play';

const PlayPage = ({ user, pages }: Partial<PlayPageProps>) => {
  const { game, play, setIsPlayEditOpen } = usePlayContext();

  const gameTitle = game?.attributes.title ?? 'Game';
  const playTitle = play?.attributes.title ?? 'Play';
  const title = `${gameTitle} - ${playTitle}`;

  const parentPageHref = `/gameMaps/games/${game?.id}`;

  const breadcrumbs: BreadcrumbsItem[] = [
    { title: 'Games', href: '/gameMaps/games' },
    {
      title: gameTitle,
      href: parentPageHref,
    },
    {
      title: playTitle,
      href: `/gameMaps/games/${game?.id}/plays/${play?.id}`,
      action: () => setIsPlayEditOpen(true),
    },
  ];

  return (
    <GameMapsTemplate
      title={title}
      user={user}
      pages={pages}
      description={play?.attributes.description || title}
      breadcrumbs={breadcrumbs}
    >
      <Play />
    </GameMapsTemplate>
  );
};

export default PlayPage;
