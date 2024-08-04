import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { showWhen } from '@/common/utils/dayjs';

import PlayCard from '../PlayCard';

jest.mock('@/common/utils/dayjs');

describe('PlayCard snapshot', () => {
  const mockedTitle = 'Title';
  const mockedDescription = 'Description';
  const mockedHref = '/href';
  const mockedProps = {
    title: mockedTitle,
    description: mockedDescription,
    href: mockedHref,
  };
  const mockedCreatedAt = 'Yesterday 9:18am';
  const mockedUpdatedAt = 'Today 10:48pm';
  const mockedHandler = jest.fn();

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PlayCard {...mockedProps} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when optional props passed', () => {
    test('renders successfully', () => {
      // Arange
      const showWhenResult = 'show-when-result';
      const mockedShowWhen = jest.fn(() => showWhenResult);
      (showWhen as unknown as jest.Mock).mockImplementation(mockedShowWhen);
      // Act
      const { baseElement } = renderWithTheme(
        <PlayCard
          {...mockedProps}
          createdAt={mockedCreatedAt}
          updatedAt={mockedUpdatedAt}
          onClick={mockedHandler}
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedShowWhen).toBeCalledTimes(2);
      expect(mockedShowWhen).nthCalledWith(1, mockedCreatedAt);
      expect(mockedShowWhen).nthCalledWith(2, mockedUpdatedAt);
    });
  });
});
