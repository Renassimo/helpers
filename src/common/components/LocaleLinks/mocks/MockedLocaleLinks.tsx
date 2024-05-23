const MockedLocaleLinks = jest.fn(({ locale, locales, href }) => (
  <div>
    Mocked Locale Links:
    <span>
      {locale} -{' '}
      {locales.map((lcl: string) => (
        <span key={lcl}>{lcl}</span>
      ))}{' '}
      - {href}
    </span>
  </div>
));

export default MockedLocaleLinks;
