import { useErrorAlert } from '@/common/hooks/alerts';

import { PlayPageProps } from '@/gameMaps/types';

import PlayProvider from '@/gameMaps/providers/PlayProvider';

import PlayPage from './PlayPage';

const PlayPageRoot = ({ user, pages, data, error }: PlayPageProps) => {
  useErrorAlert(error);

  return (
    <PlayProvider data={data}>
      <PlayPage user={user} pages={pages} />
    </PlayProvider>
  );
};

export default PlayPageRoot;
