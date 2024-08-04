import getMapBoundsAndCenter from '../getMapBoundsAndCenter';

describe('getMapBoundsAndCenter', () => {
  test('reutrns bounds and enter', () => {
    // Arange
    const expectedResult = {
      center: [0.5, 10.5],
      bounds: {
        _northEast: { lat: 1, lng: 11 },
        _southWest: { lat: 0, lng: 10 },
      },
    };
    // Act
    const result = getMapBoundsAndCenter();
    // Assert
    expect(result).toEqual(expectedResult);
  });

  describe('when params added', () => {
    test('reutrns bounds and enter', () => {
      // Arange
      const expectedResult = {
        center: [0.5, 11],
        bounds: {
          _northEast: { lat: 1, lng: 12 },
          _southWest: { lat: 0, lng: 10 },
        },
      };
      // Act
      const result = getMapBoundsAndCenter({
        zero: 0,
        yRange: 1,
        xRange: 2,
        offset: 10,
      });
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
