import { Length, IsBoolean } from 'class-validator';

import Validator from '@/common/utils/validators';

class ItemValidator extends Validator {
  @Length(0, 300)
  description: string;

  @IsBoolean()
  collected: boolean;

  constructor({
    description,
    collected,
  }: {
    description: string;
    collected: boolean;
  }) {
    super();
    this.description = description;
    this.collected = collected;
  }
}

export default ItemValidator;
