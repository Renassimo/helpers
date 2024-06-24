import renderWithTheme from '@/common/tests/helpers';

import Breadcrumbs from '../Breadcrumbs';

import { mockedBreadCrumbItems } from '@/common/types/props/mocks';

describe('Breadcrumbs snapshot', () => {
  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <Breadcrumbs data={mockedBreadCrumbItems} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
