import { act, renderHook } from '@testing-library/react';

import useRetreiveData from '@/common/hooks/useRetreiveData';
import { mockedMyFlight } from '@/myFlights/types/mocks';

import useMyFlightForm from '../subhooks/useMyFlightForm';

jest.mock('@/common/hooks/useRetreiveData');

describe('useMyFlightForm', () => {
  const loadedValues = {};
  const cleanUp = jest.fn();
  const updateMyFlight = jest.fn();
  const deleteMyFlight = jest.fn();
  const updateOptions = jest.fn();
  const updateMatchers = jest.fn();

  const defaultState = {
    isModalOpen: false,
    openModal: expect.any(Function),
    closeModal: expect.any(Function),
    state: {},
    setValue: expect.any(Function),
    isEditing: false,
    onSubmit: expect.any(Function),
    onDelete: expect.any(Function),
    loading: false,
  };

  const mockedRetreivedData = { id: 'retreived data id' };
  const mockedRetreive = jest.fn(() => ({ data: mockedRetreivedData }));
  const mockedUseRetrieveData = jest.fn(() => ({
    retreive: mockedRetreive,
    loading: false,
  }));

  beforeEach(() => {
    (useRetreiveData as unknown as jest.Mock).mockImplementation(
      mockedUseRetrieveData
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns state', () => {
    // Arange
    // Act
    const { result } = renderHook(() =>
      useMyFlightForm(
        loadedValues,
        cleanUp,
        updateMyFlight,
        deleteMyFlight,
        updateOptions,
        updateMatchers
      )
    );
    // Assert
    expect(result.current).toEqual(defaultState);
  });

  describe('when loaded values passed', () => {
    test('returns state', () => {
      // Arange
      const loadedValues = {
        date: 'loadedValues.date',
        flightNumber: 'loadedValues.flightNumber',
        registration: 'loadedValues.registration',
        cn: 'loadedValues.cn',
        firstFlight: 'loadedValues.firstFlight',
        airplaneName: 'loadedValues.airplaneName',
        originName: 'loadedValues.originName',
        destinationName: 'loadedValues.destinationName',
        seatNumber: 'loadedValues.seatNumber',
        altAirline: 'loadedValues.altAirline',
        altFlightNumber: 'loadedValues.altFlightNumber',
        planespottersUrl: 'loadedValues.planespottersUrl',
        distance: 900,
        age: 'loadedValues.age',
        photoUrl: 'loadedValues.photoUrl',
      };
      // Act
      const { result } = renderHook(() =>
        useMyFlightForm(
          loadedValues,
          cleanUp,
          updateMyFlight,
          deleteMyFlight,
          updateOptions,
          updateMatchers
        )
      );
      // Assert
      expect(result.current).toEqual({
        ...defaultState,
        state: loadedValues,
      });
    });

    describe('and then calls onSubmit', () => {
      test('calls retrieveData, callbacks and updates state', async () => {
        // Arange
        const loadedValues = {
          originName: 'loadedValues.originName',
          origin: 'loadedValues.origin',
        };
        const { result } = renderHook(() =>
          useMyFlightForm(
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers
          )
        );
        await act(async () => {
          await result.current.openModal();
        });
        await act(async () => {
          await result.current.setValue('origin', 'WAW');
        });
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedRetreive).toBeCalledWith('/api/myFlights', {
          method: 'POST',
          body: JSON.stringify({
            data: {
              attributes: {
                originName: 'loadedValues.originName',
                origin: 'WAW',
                title: 'WAW - ',
              },
            },
          }),
        });
        expect(updateMyFlight).toBeCalledWith(mockedRetreivedData);
        expect(updateOptions).toBeCalledWith();
        expect(updateMatchers).toBeCalledWith({
          airlines: {},
          airports: { 'loadedValues.origin': 'WAW' },
          manufacturers: {},
          models: {},
        });
        expect(result.current).toEqual(defaultState);
      });
    });
  });

  describe('when opens modal', () => {
    test('update state', async () => {
      // Arange
      const { result } = renderHook(() =>
        useMyFlightForm(
          loadedValues,
          cleanUp,
          updateMyFlight,
          deleteMyFlight,
          updateOptions,
          updateMatchers
        )
      );
      // Act
      await act(async () => {
        await result.current.openModal();
      });
      // Assert
      expect(result.current).toEqual({ ...defaultState, isModalOpen: true });
    });

    describe('and closes modal', () => {
      test('update state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useMyFlightForm(
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers
          )
        );
        await act(async () => {
          await result.current.openModal();
        });
        expect(result.current).toEqual({ ...defaultState, isModalOpen: true });
        // Act
        await act(async () => {
          await result.current.closeModal();
        });
        // Assert
        expect(result.current).toEqual(defaultState);
      });
    });

    describe('and then calls onSubmit', () => {
      test('calls retrieveData, callbacks and updates state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useMyFlightForm(
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers
          )
        );
        await act(async () => {
          await result.current.openModal();
        });
        await act(async () => {
          await result.current.setValue('origin', 'WAW');
        });
        // Act
        await act(async () => {
          await result.current.onSubmit();
        });
        // Assert
        expect(mockedRetreive).toBeCalledWith('/api/myFlights', {
          method: 'POST',
          body: JSON.stringify({
            data: { attributes: { origin: 'WAW', title: 'WAW - ' } },
          }),
        });
        expect(updateMyFlight).toBeCalledWith(mockedRetreivedData);
        expect(updateOptions).toBeCalledWith();
        expect(updateMatchers).not.toBeCalled();
        expect(result.current).toEqual(defaultState);
      });
    });

    describe('and when passes data', () => {
      test('update state', async () => {
        // Arange
        const { result } = renderHook(() =>
          useMyFlightForm(
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers
          )
        );
        // Act
        await act(async () => {
          await result.current.openModal(mockedMyFlight);
        });
        // Assert
        expect(result.current).toEqual({
          ...defaultState,
          isModalOpen: true,
          isEditing: true,
          state: mockedMyFlight.attributes,
        });
      });

      describe('and then calls onSubmit', () => {
        test('calls retrieveData, callbacks and updates state', async () => {
          // Arange
          const { result } = renderHook(() =>
            useMyFlightForm(
              loadedValues,
              cleanUp,
              updateMyFlight,
              deleteMyFlight,
              updateOptions,
              updateMatchers
            )
          );
          await act(async () => {
            await result.current.openModal(mockedMyFlight);
          });
          await act(async () => {
            await result.current.setValue('origin', 'WAW');
          });
          // Act
          await act(async () => {
            await result.current.onSubmit();
          });
          // Assert
          expect(mockedRetreive).toBeCalledWith(
            `/api/myFlights/${mockedMyFlight.id}`,
            {
              method: 'PATCH',
              body: JSON.stringify({ data: { attributes: { origin: 'WAW' } } }),
            }
          );
          expect(updateMyFlight).toBeCalledWith(mockedRetreivedData);
          expect(updateOptions).toBeCalledWith();
          expect(updateMatchers).not.toBeCalled();
          expect(result.current).toEqual(defaultState);
        });
      });

      describe('and then calls onDelete', () => {
        test('calls retrieveData, deleteMyFlight and updates state', async () => {
          // Arange
          const confirmSpy = jest.spyOn(window, 'confirm');
          confirmSpy.mockImplementation(jest.fn(() => true));

          const { result } = renderHook(() =>
            useMyFlightForm(
              loadedValues,
              cleanUp,
              updateMyFlight,
              deleteMyFlight,
              updateOptions,
              updateMatchers
            )
          );
          await act(async () => {
            await result.current.openModal(mockedMyFlight);
          });
          // Act
          await act(async () => {
            await result.current.onDelete();
          });
          // Assert
          expect(mockedRetreive).toBeCalledWith(
            `/api/myFlights/${mockedMyFlight.id}`,
            {
              method: 'DELETE',
            }
          );
          expect(deleteMyFlight).toBeCalledWith(mockedMyFlight.id);
          expect(updateOptions).not.toBeCalled();
          expect(updateMatchers).not.toBeCalled();
          expect(result.current).toEqual(defaultState);
        });

        describe('but does not confirms deletion', () => {
          test('does not call retrieveData, deleteMyFlight and updates state', async () => {
            // Arange
            const confirmSpy = jest.spyOn(window, 'confirm');
            confirmSpy.mockImplementation(jest.fn(() => false));

            const { result } = renderHook(() =>
              useMyFlightForm(
                loadedValues,
                cleanUp,
                updateMyFlight,
                deleteMyFlight,
                updateOptions,
                updateMatchers
              )
            );
            await act(async () => {
              await result.current.openModal(mockedMyFlight);
            });
            // Act
            await act(async () => {
              await result.current.onDelete();
            });
            // Assert
            expect(mockedRetreive).not.toBeCalled();
            expect(deleteMyFlight).not.toBeCalled();
            expect(updateOptions).not.toBeCalled();
            expect(updateMatchers).not.toBeCalled();
            expect(result.current).toEqual({
              ...defaultState,
              isModalOpen: true,
              isEditing: true,
              state: mockedMyFlight.attributes,
            });
          });
        });
      });
    });
  });
});
