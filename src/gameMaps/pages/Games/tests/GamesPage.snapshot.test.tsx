import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { PageInfo } from '@/common/types/auth';

import PageTemplate from '@/common/templates/PageTemplate';
import PagesList from '@/common/components/PagesList';

import GamesPage from '../GamesPage';

import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';
import MockedPagesList from '@/common/components/PagesList/mocks';
import { mockedUser } from '@/common/types/auth/mocks';
import { mockedGames } from '@/gameMaps/types/mocks';

jest.mock('@/common/templates/PageTemplate');
jest.mock('@/common/components/PagesList');

describe('GamesPage snapshot', () => {
  const mockedPages: PageInfo[] = [{ title: 'Page 1', path: '/page1' }];

  beforeAll(() => {
    (PageTemplate as unknown as jest.Mock).mockImplementation(
      MockedPageTemplate
    );
    (PagesList as unknown as jest.Mock).mockImplementation(MockedPagesList);
  });
  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <GamesPage
        data={mockedGames}
        user={mockedUser}
        error={null}
        pages={mockedPages}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
