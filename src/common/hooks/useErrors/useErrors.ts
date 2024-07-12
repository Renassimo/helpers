import { useState } from 'react';

const useErrors = (): {
  errors: Record<string, string>;
  addErrors: (properties: Record<string, string>) => void;
  cleanErrors: () => void;
} => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addErrors = (newErrors: Record<string, string>) => {
    setErrors((current) => ({ ...current, ...newErrors }));
  };

  const cleanErrors = () => {
    setErrors({});
  };

  return { errors, addErrors, cleanErrors };
};

export default useErrors;
