const MockedImagePicker = jest.fn(({ previewUrl }) => (
  <div>MockedImagePicker - {previewUrl}</div>
));

export default MockedImagePicker;
