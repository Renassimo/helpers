import renderWithTheme from '@/common/tests/helpers/renderWithTheme';
import PlayCard from '../PlayCard';

describe('PlayCard snapshot', () => {
  const mockedTitle = 'Title';
  const mockedDescription = 'Description';
  const mockedHref = '/href';
  const mockedProps = {
    title: mockedTitle,
    description: mockedDescription,
    href: mockedHref,
  };
  const mockedStartDate = 'Yesterday 9:18am';
  const mockedLastUpdateDate = 'Today 10:48pm';
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
      // Act
      const { baseElement } = renderWithTheme(
        <PlayCard
          {...mockedProps}
          startDate={mockedStartDate}
          lastUpdateDate={mockedLastUpdateDate}
          onClick={mockedHandler}
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
