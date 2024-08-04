import { Length } from 'class-validator';

import Validator from '@/common/utils/validators/validator';

import { CommonError } from '@/common/types/errors';

import validate from '../validate';

describe('validate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  class ExtendedValidator extends Validator {
    @Length(3, 5)
    prop1: string;

    @Length(3, 5)
    prop2: string;

    constructor({ prop1, prop2 }: { prop1: string; prop2: string }) {
      super();
      this.prop1 = prop1;
      this.prop2 = prop2;
    }
  }

  test('validates without errors', async () => {
    // Arange
    const mockedAddErrors = jest.fn();
    const mockedProperties = { prop1: '123', prop2: '1234' };
    // Act
    await validate(new ExtendedValidator(mockedProperties), mockedAddErrors);
    // Assert
    expect(mockedAddErrors).toHaveBeenCalledWith({});
  });

  describe('when validates with errors', () => {
    test('return erros and throws error', async () => {
      // Arange
      const mockedAddErrors = jest.fn();
      const mockedProperties = { prop1: '123456', prop2: '1234' };
      // Act
      // Assert
      let error = '';
      try {
        await validate(
          new ExtendedValidator(mockedProperties),
          mockedAddErrors
        );
      } catch (err: unknown) {
        error = (err as CommonError)?.message ?? '';
      }
      expect(error).toEqual('Some of fields are not valid');
      expect(mockedAddErrors).toHaveBeenCalledWith({
        prop1: 'prop1 must be shorter than or equal to 5 characters',
      });
    });
  });
});
