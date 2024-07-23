import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { useErrorAlert } from '@/common/hooks/alerts';

import PlayProvider from '@/gameMaps/providers/PlayProvider';
import PlayPage from '@/gameMaps/pages/Play/PlayPage';

import MockedPlayProvider from '@/gameMaps/providers/mocks';
import MockedPlayPage from '@/gameMaps/pages/Play/mocks';
import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import {
  mockedCategories,
  mockedGame,
  mockedItems,
  mockedPlay,
} from '@/gameMaps/types/mocks';

import { PlayPageProps } from '@/gameMaps/types';

import PlayPageRoot from '../PlayPageRoot';

jest.mock('@/gameMaps/providers/PlayProvider');
jest.mock('@/gameMaps/pages/Play/PlayPage');
jest.mock('@/common/hooks/alerts');

describe('Game Page snapshot', () => {
  const mockedUseErrorAlert = jest.fn();

  beforeEach(() => {
    (PlayProvider as unknown as jest.Mock).mockImplementationOnce(
      MockedPlayProvider
    );
    (PlayPage as unknown as jest.Mock).mockImplementationOnce(MockedPlayPage);
    (useErrorAlert as unknown as jest.Mock).mockImplementation(
      mockedUseErrorAlert
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    const mockedProps: PlayPageProps = {
      user: mockedUser,
      pages: mockedPageInfos,
      data: {
        gameData: mockedGame,
        playData: mockedPlay,
        categoriesData: mockedCategories,
        itemsData: mockedItems,
      },
      error: null,
    };
    // Act
    const { container } = renderWithTheme(<PlayPageRoot {...mockedProps} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(mockedUseErrorAlert).toHaveBeenCalledWith(null);
    expect(MockedPlayPage).toHaveBeenCalledWith(
      { user: mockedUser, pages: mockedPageInfos },
      {}
    );
  });

  describe('when got an error', () => {
    test('renders successfully', () => {
      // Arange
      const mockedError = { message: 'Error' };
      const mockedProps: PlayPageProps = {
        user: mockedUser,
        pages: mockedPageInfos,
        data: null,
        error: mockedError,
      };
      // Act
      const { container } = renderWithTheme(<PlayPageRoot {...mockedProps} />);
      // Assert
      expect(container).toMatchSnapshot();
      expect(mockedUseErrorAlert).toHaveBeenCalledWith(mockedError);
    });
  });
});
