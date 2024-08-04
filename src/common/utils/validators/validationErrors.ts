import { ValidationError } from 'class-validator';

class ValidationErrors {
  hasError: boolean;
  messages: {
    [key: string]: string;
  };

  constructor(errors: ValidationError[] = []) {
    this.hasError = errors.length > 0;
    this.messages = {};
    if (this.hasError) {
      errors.forEach((error) => {
        const { property, constraints } = error;
        const constraint = Object.values(constraints ?? {})[0];
        if (constraint) this.messages[property] = constraint;
      });
    }
  }

  clearProperty(property: string) {
    delete this.messages[property];
  }
}

export default ValidationErrors;
