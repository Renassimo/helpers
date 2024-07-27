import SaveMarkerPopupContent from '../components/SaveMarkerPopupContent';

const renderSaveMarkerPopupContent = ({
  text,
  onAdd,
  onCancel,
}: {
  text: string;
  onAdd: () => void;
  onCancel: () => void;
}) => {
  return (
    <SaveMarkerPopupContent onAdd={onAdd} onCancel={onCancel} text={text} />
  );
};

export default renderSaveMarkerPopupContent;
