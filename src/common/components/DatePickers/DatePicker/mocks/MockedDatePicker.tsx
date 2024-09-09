const MockedDatePicker = jest.fn(({ dayValue, staticPicker, openTo }) => (
  <div>
    MockedDatePicker - {dayValue} - {staticPicker && 'static'} - {openTo}
  </div>
));

export default MockedDatePicker;
