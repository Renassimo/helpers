import { PageInfo, User } from '@/auth/types';
import { BreadcrumbsItem } from '@/common/types/props';

import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';

const CreateInfoPage = ({ user, pages }: { user: User; pages: PageInfo[] }) => {
  const breadcrumbs: BreadcrumbsItem[] = [
    { title: 'Spotting', href: '/spotting' },
  ];

  return (
    <PageTemplateWithBreadcrumbs
      title="Spotting"
      user={user}
      pages={pages}
      breadcrumbs={breadcrumbs}
    >
      <div>CreateInfoPage</div>
    </PageTemplateWithBreadcrumbs>
  );
};

export default CreateInfoPage;
