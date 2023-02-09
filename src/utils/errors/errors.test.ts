import { errors, getError } from '@/utils/errors/index';

describe('getError', () => {
  test('returns error object', () => {
    // Arrange
    const status = 401;
    const expectedResult = { error: errors[status] };
    // Act
    const result = getError(status);
    // Assert
    expect(result).toEqual(expectedResult);
  });

  describe('when wrong status passed', () => {
    test('returns 500 error object', () => {
      // Arrange
      const status = 1;
      const expectedResult = { error: errors[500] };
      // Act
      const result = getError(status);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when no status passed', () => {
    test('returns 500 error object', () => {
      // Arrange
      // Act
      const result = getError();
      const expectedResult = { error: errors[500] };
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when custom message passed', () => {
    test('returns error object', () => {
      // Arrange
      const status = 405;
      const customMessage = 'Only PATCH method is possible';
      const expectedResult = {
        error: {
          ...errors[status],
          message: `${errors[status].message}: ${customMessage}`,
        },
      };
      // Act
      const result = getError(status, customMessage);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
