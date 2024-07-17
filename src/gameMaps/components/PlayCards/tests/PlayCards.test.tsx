import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import PlayCard from '@/gameMaps/components/PlayCard';

import MockedPlayCard from '@/gameMaps/components/PlayCard/mocks';

import { mockedGame, mockedPlays } from '@/gameMaps/types/mocks';

import PlayCards from '../PlayCards';

jest.mock('@/gameMaps/components/PlayCard');

describe('PlayCards', () => {
  beforeEach(() => {
    (PlayCard as unknown as jest.Mock).mockImplementation(MockedPlayCard);
  });

  const mockedOnAddNewPlay = jest.fn();

  test('renders snapshot successfully', () => {
    // Arange
    const mockedData = mockedPlays;
    const mockedGameId = mockedGame.id;
    // Act
    const { container } = renderWithTheme(
      <PlayCards
        data={mockedData}
        gameId={mockedGameId}
        onAddNewPlay={mockedOnAddNewPlay}
      />
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
