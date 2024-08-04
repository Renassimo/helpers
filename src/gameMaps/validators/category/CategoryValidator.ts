import { Length, IsInt, Min } from 'class-validator';

import { IsHashedHexColor } from '@/common/utils/validators/decorators';

import Validator from '@/common/utils/validators';

class CategoryValidator extends Validator {
  @Length(3, 20)
  title: string;

  @Length(3, 300)
  description: string;

  @IsHashedHexColor()
  color: string;

  @IsInt()
  @Min(1)
  itemsAmount: number;

  constructor({
    title,
    description,
    color,
    itemsAmount,
  }: {
    title: string;
    description: string;
    color: string;
    itemsAmount: number;
  }) {
    super();
    this.title = title;
    this.description = description;
    this.color = color;
    this.itemsAmount = itemsAmount;
  }
}

export default CategoryValidator;
