import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';

import Breadcrumbs from '@/common/components/Breadcrumbs';
import PageTemplate from '@/common/templates/PageTemplate';

import MockedBreadcrumbs from '@/common/components/Breadcrumbs/mocks';
import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';

import PageTemplateWithBreadcrumbs from '../PageTemplateWithBreadcrumbs';
import { mockedBreadCrumbItems } from '@/common/types/props/mocks';

jest.mock('@/common/components/Breadcrumbs');
jest.mock('@/common/templates/PageTemplate');

describe('PageTemplateWithBreadcrumbs snapshot', () => {
  beforeEach(() => {
    (Breadcrumbs as unknown as jest.Mock).mockImplementation(MockedBreadcrumbs);
    (PageTemplate as unknown as jest.Mock).mockImplementation(
      MockedPageTemplate
    );
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <PageTemplateWithBreadcrumbs
        title="Title"
        description="Descrtiption"
        user={mockedUser}
        pages={mockedPageInfos}
        breadcrumbs={mockedBreadCrumbItems}
      >
        Child
      </PageTemplateWithBreadcrumbs>
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
