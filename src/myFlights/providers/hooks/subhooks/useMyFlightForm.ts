import { useCallback, useEffect, useState } from 'react';

import {
  MyFlightAttributes,
  MyFlightData,
  UseMyFlightFormResult,
} from '@/myFlights/types';

import useRetreiveData from '@/common/hooks/useRetreiveData';

const useMyFlightForm = (
  loadedValues: Partial<MyFlightAttributes>,
  cleanUp: () => void,
  updateMyFlight: (flight: MyFlightData) => void,
  deleteMyFlight: (id: string) => void
): UseMyFlightFormResult => {
  const { retreive, loading } = useRetreiveData<{ data: MyFlightData }>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingData, setEditingData] = useState<MyFlightData | null>(null);
  const isEditing = !!editingData;

  const [state, setState] = useState<Partial<MyFlightAttributes>>(
    editingData?.attributes ?? {}
  );

  const setValue = useCallback((key: string, value: string | number | null) => {
    setState((current) => ({ ...current, [key]: value }));
  }, []);

  const openModal = useCallback((data?: MyFlightData | null) => {
    if (data) setEditingData(data);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingData(null);
    setState({});
    cleanUp();
  }, []);

  const onSubmit = useCallback(async () => {
    const updatedData = isEditing
      ? await retreive(`/api/myFlights/${editingData.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            data: {
              attributes: Object.entries(state).reduce(
                (result, [key, value]) => {
                  // @ts-ignore
                  if (editingData.attributes[key] === value) return result;
                  return {
                    ...result,
                    [key]: value,
                  };
                },
                {}
              ),
            },
          }),
        })
      : await retreive('/api/myFlights', {
          method: 'POST',
          body: JSON.stringify({ data: { attributes: state } }),
        });

    if (updatedData) {
      updateMyFlight(updatedData.data);
      closeModal();
    }
  }, [isEditing, editingData, state]);

  const onDelete = useCallback(async () => {
    if (!isEditing) return;
    if (!confirm(`Are you sure to delete this flight?`)) return;
    const deleted = await retreive(`/api/myFlights/${editingData.id}`, {
      method: 'DELETE',
    });
    if (!deleted) return;
    deleteMyFlight(editingData.id);
    closeModal();
  }, [isEditing, editingData]);

  useEffect(() => {
    setState((state) => ({
      ...state,
      date: loadedValues.date,
      flightNumber: loadedValues.flightNumber,
      registration: loadedValues.registration,
      cn: loadedValues.cn,
      firstFlight: loadedValues.firstFlight,
      airplaneName: loadedValues.airplaneName,
      originName: loadedValues.originName,
      destinationName: loadedValues.destinationName,
      seatNumber: loadedValues.seatNumber,
      altAirline: loadedValues.altAirline,
      altFlightNumber: loadedValues.altFlightNumber,
      planespottersUrl: loadedValues.planespottersUrl,
      distance: loadedValues.distance,
      age: loadedValues.age,
      photoUrl: loadedValues.photoUrl,
    }));
  }, [loadedValues]);

  useEffect(() => {
    if (editingData) setState(editingData.attributes);
  }, [editingData]);

  return {
    isModalOpen,
    openModal,
    closeModal,
    state,
    setValue,
    isEditing,
    onSubmit,
    onDelete,
    loading,
  };
};

export default useMyFlightForm;
