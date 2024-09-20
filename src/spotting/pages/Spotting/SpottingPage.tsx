import { PageInfo, User } from '@/auth/types';

import PageTemplate from '@/common/templates/PageTemplate';

import PagesList from '@/common/components/PagesList';
import { Typography } from '@mui/material';

const SpottingPage = ({ user, pages }: { user: User; pages: PageInfo[] }) => {
  const spottingPages: PageInfo[] = [
    {
      title: 'Descriptions',
      path: '/spotting/descriptions',
    },
  ];

  return (
    <PageTemplate title="Spotting" user={user} pages={pages}>
      <Typography component="h1" variant="h5" textAlign="center" mt={5}>
        Spotting
      </Typography>
      <PagesList pages={spottingPages} />
    </PageTemplate>
  );
};

export default SpottingPage;
