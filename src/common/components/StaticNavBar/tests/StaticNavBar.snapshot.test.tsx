import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';
import StaticNavBar from '../StaticNavBar';

describe('StaicNavBar snapshot', () => {
  test('Renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <StaticNavBar>Children</StaticNavBar>
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when gets pages', () => {
    const pages = [
      {
        title: 'title',
        path: 'path',
      },
      {
        title: 'title2',
        path: 'path2',
      },
    ];

    test('Renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <StaticNavBar pages={pages}>Children</StaticNavBar>
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when opens menu', () => {
      test('successfully renders menu items', async () => {
        // Arange
        const { baseElement, getByLabelText } = renderWithTheme(
          <StaticNavBar pages={pages}>Children</StaticNavBar>
        );
        const menuButton = getByLabelText('Open settings');
        // Act
        await userEvent.click(menuButton);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });
});
