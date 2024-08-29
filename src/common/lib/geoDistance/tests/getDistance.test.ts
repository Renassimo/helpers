import geoDistance from '../geoDistance';

describe('getDistance', () => {
  test('calculates distance between two geopoints', () => {
    // Arange
    // Act
    const result = geoDistance({ lat: 25, lon: 25 }, { lat: 26, lon: 26 });
    // Assert
    expect(result).toEqual(150);
  });
});
