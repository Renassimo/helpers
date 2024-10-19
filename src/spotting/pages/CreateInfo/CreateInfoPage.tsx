import { PageInfo, User } from '@/auth/types';
import { BreadcrumbsItem } from '@/common/types/props';

import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';

import PhotoHandler from '@/spotting/components/PhotoInfoHandler';

import PhotoInfoProvider from '@/spotting/providers/PhotoInfoProvider';

const CreateInfoPage = ({ user, pages }: { user: User; pages: PageInfo[] }) => {
  const breadcrumbs: BreadcrumbsItem[] = [
    { title: 'Spotting', href: '/spotting' },
  ];

  return (
    <PhotoInfoProvider>
      <PageTemplateWithBreadcrumbs
        title="Spotting"
        user={user}
        pages={pages}
        breadcrumbs={breadcrumbs}
      >
        <PhotoHandler />
      </PageTemplateWithBreadcrumbs>
    </PhotoInfoProvider>
  );
};

export default CreateInfoPage;
