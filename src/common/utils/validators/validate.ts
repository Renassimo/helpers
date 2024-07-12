import Validator from './validator';

const validate = async <V extends Validator>(
  validator: V,
  addErrors: (newErrors: Record<string, string>) => void
) => {
  const validationErrors = await validator.validate();
  addErrors(validationErrors.messages);
  if (validationErrors.hasError)
    throw new Error('Some of fields are not valid');
};

export default validate;
