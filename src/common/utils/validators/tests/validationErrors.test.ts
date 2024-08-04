import { ValidationError } from 'class-validator';

import ValidationErrors from '../validationErrors';

describe('validationErrors', () => {
  const mockedValidationErrors = [
    {
      property: 'prop1',
      constraints: { cons1: 'cons1 text', cons2: 'cons2 text' },
    },
    {
      property: 'prop2',
      constraints: { cons2: 'cons2 text' },
    },
  ] as ValidationError[];

  test('shows validation errors', () => {
    // Arange
    const expectedMessages = { prop1: 'cons1 text', prop2: 'cons2 text' };
    // Act
    const validationErrors = new ValidationErrors(mockedValidationErrors);
    // Assert
    expect(validationErrors.hasError).toBeTruthy();
    expect(validationErrors.messages).toEqual(expectedMessages);
  });

  describe('when clears property', () => {
    test('shows validation errors', () => {
      // Arange
      const expectedMessages = { prop1: 'cons1 text' };
      const validationErrors = new ValidationErrors(mockedValidationErrors);
      // Act
      validationErrors.clearProperty('prop2');
      // Assert
      expect(validationErrors.hasError).toBeTruthy();
      expect(validationErrors.messages).toEqual(expectedMessages);
    });
  });

  describe('when no errors', () => {
    test('shows empty errors', () => {
      // Arange
      const validationErrors = new ValidationErrors([]);
      // Act
      validationErrors.clearProperty('prop2');
      // Assert
      expect(validationErrors.hasError).toBeFalsy();
      expect(validationErrors.messages).toEqual({});
    });
  });
});
