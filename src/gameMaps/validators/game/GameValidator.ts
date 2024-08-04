import { Length } from 'class-validator';

import { IsHashedHexColor } from '@/common/utils/validators/decorators';

import Validator from '@/common/utils/validators';

class GameValidator extends Validator {
  @Length(3, 20)
  title: string;

  @Length(3, 300)
  description: string;

  @IsHashedHexColor()
  backgroundColor: string;

  constructor({
    title,
    description,
    backgroundColor,
  }: {
    title: string;
    description: string;
    backgroundColor: string;
  }) {
    super();
    this.title = title;
    this.description = description;
    this.backgroundColor = backgroundColor;
  }
}

export default GameValidator;
