import { validate } from 'class-validator';

import ValidationErrors from '../validationErrors';

import Validator from '../validator';

jest.mock('class-validator');
jest.mock('../validationErrors');

describe('Validator', () => {
  const mockedErrors = 'errors';
  const mockedValidate = jest.fn(() => mockedErrors);
  const mockedValidationErrorsResult = {
    mockedProperty: 'validation-errors-result',
  };
  const MockedValidationErrors = jest.fn(() => mockedValidationErrorsResult);

  beforeEach(() => {
    (validate as unknown as jest.Mock).mockImplementationOnce(mockedValidate);
    (ValidationErrors as unknown as jest.Mock).mockImplementationOnce(
      MockedValidationErrors
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returs errors', async () => {
    // Arange
    const validator = new Validator();
    // Act
    const result = await validator.validate();
    // Assert
    expect(mockedValidate).toHaveBeenCalledWith(validator);
    expect(ValidationErrors).toHaveBeenCalledWith(mockedErrors);
    expect(result).toEqual(mockedValidationErrorsResult);
  });
});
