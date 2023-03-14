import { Dayjs } from 'dayjs';

const MockedDatePicker = jest.fn(
  ({
    onChange,
    staticPicker = false,
  }: {
    onChange?: (event: Dayjs | null) => Promise<boolean>;
    staticPicker?: boolean;
  }) => (
    <div>
      Mocked DatePicker. Static: {staticPicker}, onChange: {!!onChange}
    </div>
  )
);

export default MockedDatePicker;
