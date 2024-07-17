import { Length } from 'class-validator';

import Validator from '@/common/utils/validators';

class PlayValidator extends Validator {
  @Length(3, 20)
  title: string;

  @Length(3, 300)
  description: string;

  constructor({ title, description }: { title: string; description: string }) {
    super();
    this.title = title;
    this.description = description;
  }
}

export default PlayValidator;
