import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import PagesList from '../PagesList';
import { mockedPageInfos } from '@/auth/types/mocks';

describe('PagesList snapshot', () => {
  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <PagesList pages={mockedPageInfos} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
