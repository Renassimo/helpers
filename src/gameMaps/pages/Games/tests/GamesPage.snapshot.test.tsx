import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { PageInfo } from '@/auth/types';

import PageTemplate from '@/common/templates/PageTemplate';
import PagesList from '@/common/components/PagesList';
import GameFormModal from '@/gameMaps/components/GameFormModal';

import { useErrorAlert } from '@/common/hooks/alerts';

import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';
import MockedPagesList from '@/common/components/PagesList/mocks';
import MockedGameFormModal from '@/gameMaps/components/GameFormModal/mocks';
import { mockedUser } from '@/auth/types/mocks';
import { mockedGames } from '@/gameMaps/types/mocks';

import GamesPage from '../GamesPage';

jest.mock('@/common/templates/PageTemplate');
jest.mock('@/common/components/PagesList');
jest.mock('@/gameMaps/components/GameFormModal');
jest.mock('@/common/hooks/alerts');

describe('GamesPage snapshot', () => {
  const mockedPages: PageInfo[] = [{ title: 'Page 1', path: '/page1' }];
  const mockedUseErrorAlert = jest.fn();

  beforeAll(() => {
    (PageTemplate as unknown as jest.Mock).mockImplementation(
      MockedPageTemplate
    );
    (PagesList as unknown as jest.Mock).mockImplementation(MockedPagesList);
    (GameFormModal as unknown as jest.Mock).mockImplementation(
      MockedGameFormModal
    );
    (useErrorAlert as unknown as jest.Mock).mockImplementation(
      mockedUseErrorAlert
    );
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
    expect(mockedUseErrorAlert).toHaveBeenCalledWith(null);
    expect(MockedGameFormModal).toHaveBeenCalledWith(
      {
        isModalOpen: false,
        setIsModalOpen: expect.any(Function),
        onFinish: expect.any(Function),
      },
      {}
    );
  });
});
