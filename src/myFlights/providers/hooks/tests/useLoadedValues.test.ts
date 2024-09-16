import { act, renderHook } from '@testing-library/react';

import {
  UseAircraftsResult,
  UseAirportsResult,
  UseFlightsResult,
} from '@/myFlights/types';

import { showTimePassed } from '@/common/utils/dayjs';
import geoDistance from '@/common/lib/geoDistance';

import useLoadedValues from '../subhooks/useLoadedValues';

jest.mock('@/common/utils/dayjs');
jest.mock('@/common/lib/geoDistance');

describe('useLoadedValues', () => {
  const age = 'N years';
  const distance = 999;

  beforeEach(() => {
    (showTimePassed as unknown as jest.Mock).mockImplementation(() => age);
    (geoDistance as unknown as jest.Mock).mockImplementation(() => distance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  // Flights
  const cleanUpFlights = jest.fn();
  const chosenFlight = {
    id: 'flight-id',
    attributes: {
      flightNumber: 'flight.flightNumber',
      origin: 'flight.origin',
      originName: 'flight.originName',
      destination: 'flight.destination',
      destinationName: 'flight.destinationName',
      distance: 111,
      date: 'flight.date',
      airline: 'flight.airline',
      aircraft: 'flight.aircraft',
      registration: 'flight.registration',
      photoUrl: 'flight.photoUrl',
      originLocation: {
        lat: 1,
        lon: 11,
      },
      destinationLocation: {
        lat: 2,
        lon: 22,
      },
    },
  };
  const flightsResult = {
    chosenFlight,
    cleanUpFlights,
  } as unknown as UseFlightsResult;

  // Aircrafs
  const cleanUpAircrafts = jest.fn();
  const chosenAircraft = {
    id: 'aircraft-id',
    attributes: {
      registration: 'aircraft.registration',
      serial: 'aircraft.serial',
      airlineName: 'aircraft.airlineName',
      modelCode: 'aircraft.modelCode',
      model: 'aircraft.model',
      typeName: 'aircraft.typeName',
      productionLine: 'aircraft.productionLine',
      isFreighter: false,
      firstFlightDate: 'aircraft.firstFlightDate',
      rolloutDate: 'aircraft.rolloutDate',
      deliveryDate: 'aircraft.deliveryDate',
      photoUrl: 'aircraft.photoUrl',
    },
  };
  const aircraftsResult = {
    chosenAircraft,
    cleanUpAircrafts,
  } as unknown as UseAircraftsResult;

  // Airports
  // Origin
  const cleanUpOrigins = jest.fn();
  const chosenOrigin = {
    id: 'origin-id',
    attributes: {
      airportCode: 'origin.airportCode',
      airportName: 'origin.airportName',
      municipalityName: 'origin.municipalityName',
      shortName: 'origin.shortName',
      location: {
        lat: 3,
        lon: 33,
      },
    },
  };
  const originsResult = {
    chosenAirport: chosenOrigin,
    cleanUpAirports: cleanUpOrigins,
  } as unknown as UseAirportsResult;
  // Destination
  const cleanUpDestinations = jest.fn();
  const chosenDestination = {
    id: 'destination-id',
    attributes: {
      airportCode: 'destination.airportCode',
      airportName: 'destination.airportName',
      municipalityName: 'destination.municipalityName',
      shortName: 'destination.shortName',
      location: {
        lat: 4,
        lon: 44,
      },
    },
  };
  const destinationsResult = {
    chosenAirport: chosenDestination,
    cleanUpAirports: cleanUpDestinations,
  } as unknown as UseAirportsResult;

  describe('when calls cleanup', () => {
    test('returns default state', async () => {
      // Arange
      const { result } = renderHook(() =>
        useLoadedValues({
          flightsResult,
          aircraftsResult,
          originsResult,
          destinationsResult,
        })
      );
      // Act
      await act(async () => {
        await result.current.cleanUp();
      });
      // Assert
      expect(cleanUpAircrafts).toBeCalledTimes(1);
      expect(cleanUpDestinations).toBeCalledTimes(1);
      expect(cleanUpOrigins).toBeCalledTimes(1);
      expect(cleanUpFlights).toBeCalledTimes(1);
    });
  });

  describe('when different chosen data passed', () => {
    describe('when all results passed', () => {
      test('returns default state', () => {
        // Arange
        const registration = chosenAircraft?.attributes.registration;

        const firstFlight = chosenAircraft?.attributes.firstFlightDate;
        const date = chosenFlight?.attributes.date;

        const expectedResult = {
          title: null,
          date,
          airline: chosenAircraft?.attributes.airlineName,
          flightNumber: chosenFlight?.attributes.flightNumber,
          origin: chosenOrigin?.attributes.airportCode,
          destination: chosenDestination?.attributes.airportCode,
          manufacturer: chosenAircraft?.attributes.typeName,
          model: chosenAircraft?.attributes.modelCode,
          registration,
          cn: chosenAircraft?.attributes.serial,
          firstFlight,
          airplaneName: null,
          originName: chosenOrigin?.attributes.airportName,
          destinationName: chosenDestination?.attributes.airportName,
          seatNumber: null,
          altAirline: null,
          altFlightNumber: null,
          planespottersUrl: `https://www.planespotters.net/search?q=${registration}`,
          distance: chosenFlight?.attributes.distance,
          age,
          photoUrl: chosenAircraft?.attributes.photoUrl,
        };
        // Act
        const { result } = renderHook(() =>
          useLoadedValues({
            flightsResult,
            aircraftsResult,
            originsResult,
            destinationsResult,
          })
        );
        // Assert
        expect(result.current.loadedValues).toEqual(expectedResult);
        expect(showTimePassed).toBeCalledWith(firstFlight, date);
        expect(geoDistance).not.toBeCalled();
      });
    });

    describe('when chosenFlight did not passed', () => {
      test('returns state', () => {
        // Arange
        const registration = chosenAircraft?.attributes.registration;

        const firstFlight = chosenAircraft?.attributes.firstFlightDate;

        const originLocation =
          chosenOrigin?.attributes.location ??
          chosenFlight?.attributes.originLocation;
        const destinationLocation =
          chosenDestination?.attributes.location ??
          chosenFlight?.attributes.destinationLocation;

        const expectedResult = {
          title: null,
          date: null,
          airline: chosenAircraft?.attributes.airlineName,
          flightNumber: null,
          origin: chosenOrigin?.attributes.airportCode,
          destination: chosenDestination?.attributes.airportCode,
          manufacturer: chosenAircraft?.attributes.typeName,
          model: chosenAircraft?.attributes.modelCode,
          registration,
          cn: chosenAircraft?.attributes.serial,
          firstFlight,
          airplaneName: null,
          originName: chosenOrigin?.attributes.airportName,
          destinationName: chosenDestination?.attributes.airportName,
          seatNumber: null,
          altAirline: null,
          altFlightNumber: null,
          planespottersUrl: `https://www.planespotters.net/search?q=${registration}`,
          distance,
          age,
          photoUrl: chosenAircraft?.attributes.photoUrl,
        };
        // Act
        const { result } = renderHook(() =>
          useLoadedValues({
            flightsResult: { ...flightsResult, chosenFlight: null },
            aircraftsResult,
            originsResult,
            destinationsResult,
          })
        );
        // Assert
        expect(result.current.loadedValues).toEqual(expectedResult);
        expect(showTimePassed).toBeCalledWith(firstFlight, null);
        expect(geoDistance).toBeCalledWith(originLocation, destinationLocation);
      });
    });

    describe('when chosenOrigin and choseDestination did not passed', () => {
      test('returns state', () => {
        // Arange
        const registration =
          chosenAircraft?.attributes.registration ??
          chosenFlight?.attributes.registration ??
          null;

        const firstFlight =
          chosenAircraft?.attributes.firstFlightDate ??
          chosenAircraft?.attributes.rolloutDate ??
          chosenAircraft?.attributes.deliveryDate ??
          null;
        const date = chosenFlight?.attributes.date;

        const expectedResult = {
          title: null,
          date,
          airline: chosenAircraft?.attributes.airlineName,
          flightNumber: chosenFlight?.attributes.flightNumber,
          origin: chosenFlight?.attributes.origin,
          destination: chosenFlight?.attributes.destination,
          manufacturer: chosenAircraft?.attributes.typeName,
          model: chosenAircraft?.attributes.modelCode,
          registration,
          cn: chosenAircraft?.attributes.serial,
          firstFlight,
          airplaneName: null,
          originName: chosenFlight?.attributes.originName,
          destinationName: chosenFlight?.attributes.destinationName,
          seatNumber: null,
          altAirline: null,
          altFlightNumber: null,
          planespottersUrl: `https://www.planespotters.net/search?q=${registration}`,
          distance: chosenFlight?.attributes.distance,
          age,
          photoUrl: chosenAircraft?.attributes.photoUrl,
        };
        // Act
        const { result } = renderHook(() =>
          useLoadedValues({
            flightsResult,
            aircraftsResult,
            originsResult: { ...originsResult, chosenAirport: null },
            destinationsResult: { ...destinationsResult, chosenAirport: null },
          })
        );
        // Assert
        expect(result.current.loadedValues).toEqual(expectedResult);
        expect(showTimePassed).toBeCalledWith(firstFlight, date);
        expect(geoDistance).not.toBeCalled();
      });
    });

    describe('when chosenAircraft did not passed', () => {
      test('returns state', () => {
        // Arange
        const registration = chosenFlight?.attributes.registration;

        const firstFlight = null;

        const expectedResult = {
          title: null,
          date: chosenFlight?.attributes.date,
          airline: chosenFlight?.attributes.airline,
          flightNumber: chosenFlight?.attributes.flightNumber,
          origin: chosenOrigin?.attributes.airportCode,
          destination: chosenDestination?.attributes.airportCode,
          manufacturer: null,
          model: null,
          registration,
          cn: null,
          firstFlight,
          airplaneName: null,
          originName: chosenOrigin?.attributes.airportName,
          destinationName: chosenDestination?.attributes.airportName,
          seatNumber: null,
          altAirline: null,
          altFlightNumber: null,
          planespottersUrl: `https://www.planespotters.net/search?q=${registration}`,
          distance: chosenFlight?.attributes.distance,
          age: null,
          photoUrl: chosenFlight?.attributes.photoUrl,
        };
        // Act
        const { result } = renderHook(() =>
          useLoadedValues({
            flightsResult,
            aircraftsResult: { ...aircraftsResult, chosenAircraft: null },
            originsResult,
            destinationsResult,
          })
        );
        // Assert
        expect(result.current.loadedValues).toEqual(expectedResult);
        expect(showTimePassed).not.toBeCalled();
        expect(geoDistance).not.toBeCalled();
      });
    });

    describe('when not full chosenAircraft passed', () => {
      test('returns state', () => {
        // Arange
        const registration = chosenAircraft?.attributes.registration;

        const firstFlight = chosenAircraft?.attributes.deliveryDate;
        const date = chosenFlight?.attributes.date;

        const expectedResult = {
          title: null,
          date,
          airline: chosenAircraft?.attributes.airlineName,
          flightNumber: chosenFlight?.attributes.flightNumber,
          origin: chosenOrigin?.attributes.airportCode,
          destination: chosenDestination?.attributes.airportCode,
          manufacturer: chosenAircraft?.attributes.productionLine,
          model: chosenAircraft?.attributes.model,
          registration,
          cn: chosenAircraft?.attributes.serial,
          firstFlight,
          airplaneName: null,
          originName: chosenOrigin?.attributes.airportName,
          destinationName: chosenDestination?.attributes.airportName,
          seatNumber: null,
          altAirline: null,
          altFlightNumber: null,
          planespottersUrl: `https://www.planespotters.net/search?q=${registration}`,
          distance: chosenFlight?.attributes.distance,
          age,
          photoUrl: chosenAircraft?.attributes.photoUrl,
        };
        // Act
        const { result } = renderHook(() =>
          useLoadedValues({
            flightsResult,
            aircraftsResult: {
              ...aircraftsResult,
              chosenAircraft: {
                ...chosenAircraft,
                attributes: {
                  ...chosenAircraft.attributes,
                  firstFlightDate: null,
                  rolloutDate: null,
                  typeName: null,
                  modelCode: null,
                },
              },
            },
            originsResult,
            destinationsResult,
          })
        );
        // Assert
        expect(result.current.loadedValues).toEqual(expectedResult);
        expect(showTimePassed).toBeCalledWith(firstFlight, date);
        expect(geoDistance).not.toBeCalled();
      });
    });

    describe('when no choises passed', () => {
      test('returns state', () => {
        // Arange
        const expectedResult = {
          title: null,
          date: null,
          airline: null,
          flightNumber: null,
          origin: null,
          destination: null,
          manufacturer: null,
          model: null,
          registration: null,
          cn: null,
          firstFlight: null,
          airplaneName: null,
          originName: null,
          destinationName: null,
          seatNumber: null,
          altAirline: null,
          altFlightNumber: null,
          planespottersUrl: null,
          distance: null,
          age: null,
          photoUrl: null,
        };
        // Act
        const { result } = renderHook(() =>
          useLoadedValues({
            flightsResult: { ...flightsResult, chosenFlight: null },
            aircraftsResult: { ...aircraftsResult, chosenAircraft: null },
            originsResult: { ...originsResult, chosenAirport: null },
            destinationsResult: { ...destinationsResult, chosenAirport: null },
          })
        );
        // Assert
        expect(result.current.loadedValues).toEqual(expectedResult);
        expect(showTimePassed).not.toBeCalled();
        expect(geoDistance).not.toBeCalled();
      });
    });
  });
});
