import { useCallback, useEffect, useState } from 'react';

import {
  MyFlightAttributes,
  MyFlightData,
  UseMyFlightFormResult,
} from '@/myFlights/types';
import { Avia } from '@/avia/types/avia';
import { Matcher } from '@/common/types/matchers';

import { showTimePassed } from '@/common/utils/dayjs';

import useRetreiveData from '@/common/hooks/useRetreiveData';
import useLoadingValuesFilling from './useLoadingValuesFilling';

const useMyFlightForm = (
  loadedValues: Partial<MyFlightAttributes>,
  cleanUp: () => void,
  updateMyFlight: (flight: MyFlightData) => void,
  deleteMyFlight: (id: string) => void,
  updateOptions: () => Promise<void>,
  updateMatchers: (data: Partial<Avia.Matchers>) => Promise<void>
): UseMyFlightFormResult => {
  const { retreive, loading } = useRetreiveData<{ data: MyFlightData }>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingData, setEditingData] = useState<MyFlightData | null>(null);
  const [isReturnFlight, setIsReturnFlight] = useState(false);
  const isEditing = !!editingData && !isReturnFlight;

  const [state, setState] = useState<Partial<MyFlightAttributes>>(
    editingData?.attributes ?? {}
  );

  const setValue = useCallback((key: string, value: string | number | null) => {
    setState((current) => ({ ...current, [key]: value }));
  }, []);

  const openModal = useCallback(
    (data?: MyFlightData | null, isReturn = false) => {
      if (data) {
        if (isReturn) {
          setIsReturnFlight(true);
          setEditingData({
            attributes: {
              ...data.attributes,
              destination: data.attributes.origin,
              destinationName: data.attributes.originName,
              origin: data.attributes.destination,
              originName: data.attributes.destinationName,
            },
          } as MyFlightData);
        } else {
          setEditingData(data);
        }
      }
      setIsModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingData(null);
    setState({});
    setIsReturnFlight(false);
    cleanUp();
  }, []);

  const getNewMatcher = useCallback(
    (key: string): Matcher => {
      const loadedValue = loadedValues[key as keyof MyFlightAttributes];
      const stateValue = state[key as keyof MyFlightAttributes];

      if (!loadedValue ?? !stateValue) return {};

      return loadedValue !== stateValue
        ? { [String(loadedValue)]: String(stateValue) }
        : {};
    },
    [loadedValues, state]
  );

  const getNewMatchers = useCallback((): Avia.Matchers | null => {
    const origin = getNewMatcher('origin');
    const destination = getNewMatcher('destination');
    const airline = getNewMatcher('airline');
    const altAirline = getNewMatcher('altAirline');
    const manufacturer = getNewMatcher('manufacturer');
    const model = getNewMatcher('model');

    const hasNewMatchers = [
      origin,
      destination,
      airline,
      altAirline,
      manufacturer,
      model,
    ].some((matcher) => Object.keys(matcher).length > 0);

    if (!hasNewMatchers) return null;

    return {
      airlines: { ...airline, ...altAirline },
      airports: { ...origin, ...destination },
      manufacturers: manufacturer,
      models: model,
    };
  }, [getNewMatcher]);

  const createMyFlight = useCallback(async () => {
    return await retreive('/api/myFlights', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          attributes: {
            ...state,
            title:
              state.title ??
              `${state.origin ?? ''} - ${state.destination ?? ''}`,
          },
        },
      }),
    });
  }, [state]);

  const patchMyFlight = useCallback(
    async (editingData: MyFlightData) => {
      let updates = '';
      const attributes = Object.entries(state).reduce(
        (result, [key, value]) => {
          // @ts-ignore
          if (editingData.attributes[key] === value) return result;
          // @ts-ignore
          updates = `${updates}\n${key}: ${editingData.attributes[key]} -> ${value}`;
          return {
            ...result,
            [key]: value,
          };
        },
        {}
      );

      if (!confirm(`Update?\n${updates}`)) return;

      return await retreive(`/api/myFlights/${editingData.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          data: {
            attributes,
          },
        }),
      });
    },
    [state]
  );

  const onSubmit = useCallback(async () => {
    const updatedData = isEditing
      ? await patchMyFlight(editingData)
      : await createMyFlight();

    if (updatedData) {
      updateMyFlight(updatedData.data);

      const newMatchers = getNewMatchers();
      const promises = [updateOptions()];

      if (newMatchers) promises.push(updateMatchers(newMatchers));

      closeModal();

      await Promise.all(promises);
    }
  }, [isEditing, editingData, patchMyFlight, createMyFlight, getNewMatchers]);

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

  useLoadingValuesFilling(loadedValues, setState);

  useEffect(() => {
    if (editingData) setState(editingData.attributes);
  }, [editingData]);

  useEffect(() => {
    setValue('age', showTimePassed(state.firstFlight, state.date));
  }, [state.firstFlight, state.date]);

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
