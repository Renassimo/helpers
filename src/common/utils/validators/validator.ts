import { validate } from 'class-validator';

import ValidationErrors from './validationErrors';

class Validator {
  async validate() {
    const errors = await validate(this);
    return new ValidationErrors(errors);
  }
}

export default Validator;
