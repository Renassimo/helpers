import { MyFlightAttributes, MyFlightData } from './myFlightTypes';

export interface UseMyFlightFormResult {
  isModalOpen: boolean;
  openModal: (data?: MyFlightData | null, isReturn?: boolean) => void;
  closeModal: () => void;
  state: Partial<MyFlightAttributes>;
  setValue: (key: string, value: string | number | null) => void;
  isEditing: boolean;
  onSubmit: () => Promise<void>;
  onDelete: () => Promise<void>;
  loading: boolean;
}
