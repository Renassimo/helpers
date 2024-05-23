import renderWithTheme from '@/tests/helpers/renderWithTheme';
import NavBarMenu from '../NavBarMenu';

describe('NavBarMenu snapshot', () => {
  const mockedPages = [
    { title: 'Page 1', path: 'path1' },
    { title: 'Page 2', path: 'path2' },
  ];

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <NavBarMenu
        anchor={true as unknown as HTMLElement}
        onClose={jest.fn()}
        pages={mockedPages}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when signOut and withMain passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <NavBarMenu
          anchor={true as unknown as HTMLElement}
          onClose={jest.fn()}
          pages={mockedPages}
          signOut={jest.fn()}
          withMain
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
