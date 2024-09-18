import { act, renderHook } from '@testing-library/react';

import useRetreiveData from '@/common/hooks/useRetreiveData';
import { mockedMyFlight } from '@/myFlights/types/mocks';

import { showTimePassed } from '@/common/utils/dayjs';

import useMyFlightForm from '../subhooks/useMyFlightForm';

jest.mock('@/common/hooks/useRetreiveData');
jest.mock('@/common/utils/dayjs');

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

  const mockedPassedTime = 'N years!';

  beforeEach(() => {
    (useRetreiveData as unknown as jest.Mock).mockImplementation(
      mockedUseRetrieveData
    );
    (showTimePassed as unknown as jest.Mock).mockImplementation(
      jest.fn(() => mockedPassedTime)
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
    expect(result.current).toEqual({
      ...defaultState,
      state: { age: mockedPassedTime },
    });
    expect(showTimePassed).toBeCalledWith(undefined, undefined);
  });

  describe('when sets firstFlight and date', () => {
    test('calculate age', async () => {
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
        await result.current.setValue('date', 'dateValue');
      });
      await act(async () => {
        await result.current.setValue('firstFlight', 'firstFlightValue');
      });
      // Assert
      expect(result.current).toEqual({
        ...defaultState,
        state: {
          age: mockedPassedTime,
          date: 'dateValue',
          firstFlight: 'firstFlightValue',
        },
      });
      expect(showTimePassed).toBeCalledTimes(3);
      expect(showTimePassed).nthCalledWith(1, undefined, undefined);
      expect(showTimePassed).nthCalledWith(2, undefined, 'dateValue');
      expect(showTimePassed).nthCalledWith(3, 'firstFlightValue', 'dateValue');
    });
  });

  describe('when loaded values passed', () => {
    const loadedValues = {
      date: 'loadedValues.date',
      flightNumber: 'loadedValues.flightNumber',
      registration: 'loadedValues.registration',
      cn: 'loadedValues.cn',
      firstFlight: 'loadedValues.firstFlight',
      originName: 'loadedValues.originName',
      destinationName: 'loadedValues.destinationName',
      planespottersUrl: 'loadedValues.planespottersUrl',
      distance: 900,
      age: 'loadedValues.age',
      photoUrl: 'loadedValues.photoUrl',
    };

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
      expect(result.current).toEqual({
        ...defaultState,
        state: { ...loadedValues, age: mockedPassedTime },
      });
    });

    describe('and destination loaded value changed', () => {
      test('returns state', () => {
        // Arange
        const newLoadedValues = {
          origin: 'loadedValues.origin2',

          flightNumber: 'loadedValues.flightNumber',
          registration: 'loadedValues.registration',

          date: 'loadedValues.date2',
          cn: 'loadedValues.cn2',
          firstFlight: 'loadedValues.firstFlight2',
          originName: 'loadedValues.originName2',
          destinationName: 'loadedValues.destinationName2',
          planespottersUrl: 'loadedValues.planespottersUrl2',
          distance: 1000,
          age: 'loadedValues.age2',
          photoUrl: 'loadedValues.photoUrl2',
        };
        const initialProps = {
          loadedValues,
          cleanUp,
          updateMyFlight,
          deleteMyFlight,
          updateOptions,
          updateMatchers,
        };
        const { result, rerender } = renderHook(
          ({
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers,
          }) =>
            useMyFlightForm(
              loadedValues,
              cleanUp,
              updateMyFlight,
              deleteMyFlight,
              updateOptions,
              updateMatchers
            ),
          { initialProps }
        );
        // Act
        rerender({ ...initialProps, loadedValues: newLoadedValues });
        // Assert
        expect(result.current).toEqual({
          ...defaultState,
          state: {
            ...loadedValues,
            age: mockedPassedTime,
            originName: newLoadedValues.originName,
            distance: newLoadedValues.distance,
          },
        });
      });
    });

    describe('and origin loaded value changed', () => {
      test('returns state', () => {
        // Arange
        const newLoadedValues = {
          destination: 'loadedValues.destination2',

          flightNumber: 'loadedValues.flightNumber',
          registration: 'loadedValues.registration',

          date: 'loadedValues.date2',
          cn: 'loadedValues.cn2',
          firstFlight: 'loadedValues.firstFlight2',
          originName: 'loadedValues.originName2',
          destinationName: 'loadedValues.destinationName2',
          planespottersUrl: 'loadedValues.planespottersUrl2',
          distance: 1000,
          age: 'loadedValues.age2',
          photoUrl: 'loadedValues.photoUrl2',
        };
        const initialProps = {
          loadedValues,
          cleanUp,
          updateMyFlight,
          deleteMyFlight,
          updateOptions,
          updateMatchers,
        };
        const { result, rerender } = renderHook(
          ({
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers,
          }) =>
            useMyFlightForm(
              loadedValues,
              cleanUp,
              updateMyFlight,
              deleteMyFlight,
              updateOptions,
              updateMatchers
            ),
          { initialProps }
        );
        // Act
        rerender({ ...initialProps, loadedValues: newLoadedValues });
        // Assert
        expect(result.current).toEqual({
          ...defaultState,
          state: {
            ...loadedValues,
            age: mockedPassedTime,
            destinationName: newLoadedValues.destinationName,
            distance: newLoadedValues.distance,
          },
        });
      });
    });

    describe('and flightNumber loaded value changed', () => {
      test('returns state', () => {
        // Arange
        const newLoadedValues = {
          flightNumber: 'loadedValues.flightNumber2',

          registration: 'loadedValues.registration',

          date: 'loadedValues.date2',
          cn: 'loadedValues.cn2',
          firstFlight: 'loadedValues.firstFlight2',
          originName: 'loadedValues.originName2',
          destinationName: 'loadedValues.destinationName2',
          planespottersUrl: 'loadedValues.planespottersUrl2',
          distance: 1000,
          age: 'loadedValues.age2',
          photoUrl: 'loadedValues.photoUrl2',
        };
        const initialProps = {
          loadedValues,
          cleanUp,
          updateMyFlight,
          deleteMyFlight,
          updateOptions,
          updateMatchers,
        };
        const { result, rerender } = renderHook(
          ({
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers,
          }) =>
            useMyFlightForm(
              loadedValues,
              cleanUp,
              updateMyFlight,
              deleteMyFlight,
              updateOptions,
              updateMatchers
            ),
          { initialProps }
        );
        // Act
        rerender({ ...initialProps, loadedValues: newLoadedValues });
        // Assert
        expect(result.current).toEqual({
          ...defaultState,
          state: {
            ...loadedValues,
            age: mockedPassedTime,
            date: newLoadedValues.date,
            destinationName: newLoadedValues.destinationName,
            originName: newLoadedValues.originName,
            distance: newLoadedValues.distance,
            flightNumber: newLoadedValues.flightNumber,
          },
        });
      });
    });

    describe('and registration loaded value changed', () => {
      test('returns state', () => {
        // Arange
        const newLoadedValues = {
          registration: 'loadedValues.registration2',

          flightNumber: 'loadedValues.flightNumber',

          date: 'loadedValues.date2',
          cn: 'loadedValues.cn2',
          firstFlight: 'loadedValues.firstFlight2',
          originName: 'loadedValues.originName2',
          destinationName: 'loadedValues.destinationName2',
          planespottersUrl: 'loadedValues.planespottersUrl2',
          distance: 1000,
          age: 'loadedValues.age2',
          photoUrl: 'loadedValues.photoUrl2',
        };
        const initialProps = {
          loadedValues,
          cleanUp,
          updateMyFlight,
          deleteMyFlight,
          updateOptions,
          updateMatchers,
        };
        const { result, rerender } = renderHook(
          ({
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers,
          }) =>
            useMyFlightForm(
              loadedValues,
              cleanUp,
              updateMyFlight,
              deleteMyFlight,
              updateOptions,
              updateMatchers
            ),
          { initialProps }
        );
        // Act
        rerender({ ...initialProps, loadedValues: newLoadedValues });
        // Assert
        expect(result.current).toEqual({
          ...defaultState,
          state: {
            ...loadedValues,
            age: mockedPassedTime,
            registration: newLoadedValues.registration,
            cn: newLoadedValues.cn,
            firstFlight: newLoadedValues.firstFlight,
            planespottersUrl: newLoadedValues.planespottersUrl,
            photoUrl: newLoadedValues.photoUrl,
          },
        });
      });
    });

    describe('and both flightNumber and registration loaded values changed', () => {
      test('returns state', () => {
        // Arange
        const newLoadedValues = {
          flightNumber: 'loadedValues.flightNumber2',
          registration: 'loadedValues.registration2',

          date: 'loadedValues.date2',
          cn: 'loadedValues.cn2',
          firstFlight: 'loadedValues.firstFlight2',
          originName: 'loadedValues.originName2',
          destinationName: 'loadedValues.destinationName2',
          planespottersUrl: 'loadedValues.planespottersUrl2',
          distance: 1000,
          age: 'loadedValues.age2',
          photoUrl: 'loadedValues.photoUrl2',
        };
        const initialProps = {
          loadedValues,
          cleanUp,
          updateMyFlight,
          deleteMyFlight,
          updateOptions,
          updateMatchers,
        };
        const { result, rerender } = renderHook(
          ({
            loadedValues,
            cleanUp,
            updateMyFlight,
            deleteMyFlight,
            updateOptions,
            updateMatchers,
          }) =>
            useMyFlightForm(
              loadedValues,
              cleanUp,
              updateMyFlight,
              deleteMyFlight,
              updateOptions,
              updateMatchers
            ),
          { initialProps }
        );
        // Act
        rerender({ ...initialProps, loadedValues: newLoadedValues });
        // Assert
        expect(result.current).toEqual({
          ...defaultState,
          state: {
            ...loadedValues,
            age: mockedPassedTime,
            registration: newLoadedValues.registration,
            cn: newLoadedValues.cn,
            firstFlight: newLoadedValues.firstFlight,
            planespottersUrl: newLoadedValues.planespottersUrl,
            photoUrl: newLoadedValues.photoUrl,

            date: newLoadedValues.date,
            destinationName: newLoadedValues.destinationName,
            originName: newLoadedValues.originName,
            distance: newLoadedValues.distance,
            flightNumber: newLoadedValues.flightNumber,
          },
        });
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
                age: mockedPassedTime,
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
      expect(result.current).toEqual({
        ...defaultState,
        isModalOpen: true,
        state: { age: mockedPassedTime },
      });
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
        expect(result.current).toEqual({
          ...defaultState,
          isModalOpen: true,
          state: { age: mockedPassedTime },
        });
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
            data: {
              attributes: {
                age: mockedPassedTime,
                origin: 'WAW',
                title: 'WAW - ',
              },
            },
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
          state: { ...mockedMyFlight.attributes, age: mockedPassedTime },
        });
      });

      describe('and then calls onSubmit', () => {
        test('calls retrieveData, callbacks and updates state', async () => {
          // Arange
          const confirmSpy = jest.spyOn(window, 'confirm');
          confirmSpy.mockImplementationOnce(jest.fn(() => true));

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
              body: JSON.stringify({
                data: { attributes: { age: mockedPassedTime, origin: 'WAW' } },
              }),
            }
          );
          expect(updateMyFlight).toBeCalledWith(mockedRetreivedData);
          expect(updateOptions).toBeCalledWith();
          expect(updateMatchers).not.toBeCalled();
          expect(confirmSpy).toBeCalledWith(expect.stringContaining(`Update?`));
          expect(confirmSpy).toBeCalledWith(
            expect.stringContaining(`age: age1 -> N years!`)
          );
          expect(confirmSpy).toBeCalledWith(
            expect.stringContaining(`origin: origin1 -> WAW`)
          );
          expect(result.current).toEqual({
            ...defaultState,
            state: { age: mockedPassedTime },
          });
        });

        describe('but does not confirms deletion', () => {
          test('does not call retrieveData, callbacks and updates state', async () => {
            // Arange
            const confirmSpy = jest.spyOn(window, 'confirm');
            confirmSpy.mockImplementationOnce(jest.fn(() => false));

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
            expect(mockedRetreive).not.toBeCalled();
            expect(updateMyFlight).not.toBeCalled();
            expect(updateOptions).not.toBeCalled();
            expect(updateMatchers).not.toBeCalled();
            expect(confirmSpy).toBeCalledWith(
              expect.stringContaining(`Update?`)
            );
            expect(confirmSpy).toBeCalledWith(
              expect.stringContaining(`age: age1 -> N years!`)
            );
            expect(confirmSpy).toBeCalledWith(
              expect.stringContaining(`origin: origin1 -> WAW`)
            );
            expect(result.current).toEqual({
              ...defaultState,
              isModalOpen: true,
              isEditing: true,
              state: {
                ...mockedMyFlight.attributes,
                age: mockedPassedTime,
                origin: 'WAW',
              },
            });
          });
        });
      });

      describe('when opens with flight return', () => {
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
            await result.current.openModal(mockedMyFlight, true);
          });
          // Assert
          expect(result.current).toEqual({
            ...defaultState,
            isModalOpen: true,
            isEditing: false,
            state: {
              ...mockedMyFlight.attributes,
              age: mockedPassedTime,
              destination: mockedMyFlight.attributes.origin,
              origin: mockedMyFlight.attributes.destination,
              destinationName: mockedMyFlight.attributes.originName,
              originName: mockedMyFlight.attributes.destinationName,
            },
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
              await result.current.openModal(mockedMyFlight, true);
            });
            await act(async () => {
              await result.current.setValue('origin', 'WAW');
            });
            // Act
            await act(async () => {
              await result.current.onSubmit();
            });
            // Assert
            expect(mockedRetreive).toBeCalledWith(`/api/myFlights`, {
              method: 'POST',
              body: JSON.stringify({
                data: {
                  attributes: {
                    ...mockedMyFlight.attributes,
                    age: mockedPassedTime,
                    destination: mockedMyFlight.attributes.origin,
                    title: `WAW - ${mockedMyFlight.attributes.origin}`,
                    origin: 'WAW',
                    destinationName: mockedMyFlight.attributes.originName,
                    originName: mockedMyFlight.attributes.destinationName,
                  },
                },
              }),
            });
            expect(updateMyFlight).toBeCalledWith(mockedRetreivedData);
            expect(updateOptions).toBeCalledWith();
            expect(updateMatchers).not.toBeCalled();
            expect(result.current).toEqual({
              ...defaultState,
              state: { age: mockedPassedTime },
            });
          });
        });
      });

      describe('and then calls onDelete', () => {
        test('calls retrieveData, deleteMyFlight and updates state', async () => {
          // Arange
          const confirmSpy = jest.spyOn(window, 'confirm');
          confirmSpy.mockImplementationOnce(jest.fn(() => true));

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
          expect(confirmSpy).toBeCalledWith(
            'Are you sure to delete this flight?'
          );
          expect(result.current).toEqual({
            ...defaultState,
            state: { age: mockedPassedTime },
          });
        });

        describe('but does not confirms deletion', () => {
          test('does not call retrieveData, deleteMyFlight and updates state', async () => {
            // Arange
            const confirmSpy = jest.spyOn(window, 'confirm');
            confirmSpy.mockImplementationOnce(jest.fn(() => false));

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
            expect(confirmSpy).toBeCalledWith(
              'Are you sure to delete this flight?'
            );
            expect(result.current).toEqual({
              ...defaultState,
              isModalOpen: true,
              isEditing: true,
              state: { ...mockedMyFlight.attributes, age: mockedPassedTime },
            });
          });
        });
      });
    });
  });
});
