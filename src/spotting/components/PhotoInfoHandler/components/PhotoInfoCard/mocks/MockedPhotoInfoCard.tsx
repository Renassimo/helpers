const MockedPhotoInfoCard = jest.fn(
  ({
    selected,
    name,
    preview,
    path,
    onPhotoSelected,
    onOpenZoom,
    onClick,
    onRemoveFromFolder,
  }) => (
    <div>
      {selected && 'selected'} - {name} - {preview} - {path} -{' '}
      {!!onPhotoSelected && 'onPhotoSelected'} - {!!onOpenZoom && 'onOpenZoom'}{' '}
      - {!!onClick && 'onClick'} -{' '}
      {!!onRemoveFromFolder && 'onRemoveFromFolder'}
    </div>
  )
);

export default MockedPhotoInfoCard;
