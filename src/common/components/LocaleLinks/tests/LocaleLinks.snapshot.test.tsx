import renderWithTheme from '@/common/tests/helpers/renderWithTheme';
import LocaleLinks from '../LocaleLinks';

describe('LocaleLinks', () => {
  test('renders successfully', () => {
    // Arange
    const mockedLocales = ['ru', 'en', 'tt'];
    const mockedLocale = 'en';
    const mockedHref = '/page';
    // Act
    const { baseElement } = renderWithTheme(
      <LocaleLinks
        locale={mockedLocale}
        locales={mockedLocales}
        href={mockedHref}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
