import userEvent from '@testing-library/user-event';

import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import PlayCard from '../PlayCard';

describe('PlayCard', () => {
  const mockedTitle = 'Title';
  const mockedDescription = 'Description';
  const mockedHref = '/href';
  const mockedStartDate = 'Yesterday 9:18am';
  const mockedLastUpdateDate = 'Today 10:48pm';
  const mockedHandler = jest.fn();
  const mockedProps = {
    title: mockedTitle,
    description: mockedDescription,
    href: mockedHref,
    startDate: mockedStartDate,
    lastUpdateDate: mockedLastUpdateDate,
    onClick: mockedHandler,
  };

  describe('when link with handler clicked', () => {
    test('renders successfully', async () => {
      // Arange
      const { getByText } = renderWithTheme(
        <PlayCard
          {...mockedProps}
          startDate={mockedStartDate}
          lastUpdateDate={mockedLastUpdateDate}
          onClick={mockedHandler}
        />
      );
      // Act
      await userEvent.click(getByText(mockedTitle));
      // Assert
      expect(mockedHandler).toHaveBeenCalled();
    });
  });
});
