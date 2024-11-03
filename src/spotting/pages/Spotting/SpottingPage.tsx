import { PageInfo, User } from '@/auth/types';

import PagesList from '@/common/components/PagesList';
import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';

const SpottingPage = ({ user, pages }: { user: User; pages: PageInfo[] }) => {
  const spottingPages: PageInfo[] = [
    {
      title: 'Descriptions',
      path: '/spotting/descriptions',
    },
    {
      title: 'Create Info',
      path: '/spotting/createInfo',
    },
  ];

  return (
    <PageTemplateWithBreadcrumbs
      title="Spotting"
      user={user}
      pages={pages}
      description="Spotting"
    >
      <PagesList pages={spottingPages} />
    </PageTemplateWithBreadcrumbs>
  );
};

export default SpottingPage;
