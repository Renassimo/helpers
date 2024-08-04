import { registerDecorator, ValidationOptions } from 'class-validator';

import { isValidHex } from '@/common/utils/colors';

export const IsHashedHexColor = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsHashedHexColor',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: '$property must be a hexadecimal color with #.',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return value && typeof value === 'string' && isValidHex(value);
        },
      },
    });
  };
};
