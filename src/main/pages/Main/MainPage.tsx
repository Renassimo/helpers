import { PageInfo, User } from '@/auth/types';

import Typography from '@mui/material/Typography';

import PageTemplate from '@/common/templates/PageTemplate';
import PagesList from '@/common/components/PagesList';

const MainPage = ({ user, pages }: { user: User; pages: PageInfo[] }) => (
  <>
    <PageTemplate title="Main" user={user} pages={pages}>
      <Typography component="h1" variant="h5" textAlign="center" mt={5}>
        Welcome to Helpers
      </Typography>
      <PagesList pages={pages} />
    </PageTemplate>
  </>
);

export default MainPage;
