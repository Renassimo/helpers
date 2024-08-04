import { validate, ValidationError } from 'class-validator';

import { isValidHex } from '@/common/utils/colors';

import { IsHashedHexColor } from '../decorators';

jest.mock('@/common/utils/colors');

class MyClass {
  @IsHashedHexColor()
  property: string;

  constructor(property: string) {
    this.property = property;
  }
}

describe('decorators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('IsHashedHexColor', () => {
    test('succeeds', async () => {
      // Arange
      const mockedProperty = 'mocked-property';
      const expectedResult: ValidationError[] = [];
      const mockedIsValidHex = jest.fn(() => true);
      (isValidHex as unknown as jest.Mock).mockImplementation(mockedIsValidHex);
      const instance = new MyClass(mockedProperty);
      // Act
      const result = await validate(instance);
      // Assert
      expect(mockedIsValidHex).toHaveBeenCalledWith(mockedProperty);
      expect(result).toEqual(expectedResult);
    });

    test('fails', async () => {
      // Arange
      const mockedProperty = 'mocked-property';
      const expectedResult: ValidationError[] = [
        {
          children: [],
          constraints: {
            IsHashedHexColor: 'property must be a hexadecimal color with #.',
          },
          property: 'property',
          target: {
            property: 'mocked-property',
          },
          value: 'mocked-property',
        },
      ];
      const mockedIsValidHex = jest.fn(() => false);
      (isValidHex as unknown as jest.Mock).mockImplementation(mockedIsValidHex);
      const instance = new MyClass(mockedProperty);
      // Act
      const result = await validate(instance);
      // Assert
      expect(mockedIsValidHex).toHaveBeenCalledWith(mockedProperty);
      expect(result).toEqual(expectedResult);
    });
  });
});
