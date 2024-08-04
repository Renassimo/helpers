const MockedImagePreview = jest.fn(({ previewUrl, onClear }) => {
  return (
    <div>
      MockedImagePreview - {previewUrl} - {onClear && 'onClear'}
    </div>
  );
});

export default MockedImagePreview;
