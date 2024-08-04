import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import usePlay from '@/gameMaps/hooks/usePlay';

import PlayFormModal from '@/gameMaps/components/PlayFormModal';
import PlayMapMenu from '@/gameMaps/components/PlayMapMenu';

import MockedPlayFormModal from '@/gameMaps/components/PlayFormModal/mocks';
import MockedPlayMapMenu from '@/gameMaps/components/PlayMapMenu/mocks';
import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';

import Play from '../Play';

jest.mock('@/gameMaps/hooks/usePlay');
jest.mock('@/gameMaps/components/PlayFormModal');
jest.mock('@/gameMaps/components/PlayMapMenu');
jest.mock('@/gameMaps/components/PlayMap');

describe('Play', () => {
  const mockeUpdateSubmittedPlay = jest.fn();
  const mockedIsPlayEditOpen = false;
  const mockedSetIsPlayEditOpen = jest.fn();

  const mockedUsePlay = jest.fn(() => ({
    game: mockedGame,
    play: mockedPlay,
    updateSubmittedPlay: mockeUpdateSubmittedPlay,
    isPlayEditOpen: mockedIsPlayEditOpen,
    setIsPlayEditOpen: mockedSetIsPlayEditOpen,
  }));

  beforeEach(() => {
    (PlayFormModal as unknown as jest.Mock).mockImplementation(
      MockedPlayFormModal
    );
    (PlayMapMenu as unknown as jest.Mock).mockImplementation(MockedPlayMapMenu);
    (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<Play />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
