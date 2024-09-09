import { MyFlightAttributes } from '@/myFlights/types';
import { Matcher } from '@/common/types/matchers';

export default interface MyFlightFormFieldProps {
  name: keyof MyFlightAttributes;
  label: string;
  options?: string[];
  matchers?: Matcher;
  type?: string;
  disabled?: boolean;
  isDate?: boolean;
}
