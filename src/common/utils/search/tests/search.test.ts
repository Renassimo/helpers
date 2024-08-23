import search from '../search';

describe('search', () => {
  test('finds coincidence and returns true', () => {
    expect(search('Lorem ipsum', 'm i')).toBeTruthy();
  });

  describe('there is no coincidence', () => {
    test('returns false', () => {
      expect(search('Lorem ipsum', 'Lorm')).toBeFalsy();
    });
  });

  describe('when value is falsy', () => {
    test('returns false', () => {
      expect(search('', 'm i')).toBeFalsy();
    });
  });

  describe('when value is empty string', () => {
    test('returns true', () => {
      expect(search('Lorem ipsum', '')).toBeTruthy();
    });
  });
});
