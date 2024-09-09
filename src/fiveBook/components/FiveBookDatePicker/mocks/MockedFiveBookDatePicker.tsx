import { Dayjs } from 'dayjs';

const MockedFiveBookDatePicker = jest.fn(
  ({
    onChange,
    staticPicker = false,
  }: {
    onChange?: (event: Dayjs | null) => Promise<boolean>;
    staticPicker?: boolean;
  }) => (
    <div>
      MockedFiveBookDatePicker. Static: {staticPicker}, onChange: {!!onChange}
    </div>
  )
);

export default MockedFiveBookDatePicker;
